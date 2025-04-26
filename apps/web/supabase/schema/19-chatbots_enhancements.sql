-- Lisätään chatbots-tauluun AI-botille hyödyllisiä kenttiä
ALTER TABLE public.chatbots 
ADD COLUMN IF NOT EXISTS model_name varchar(255) DEFAULT 'gpt-4o',
ADD COLUMN IF NOT EXISTS model_settings jsonb DEFAULT '{
  "temperature": 0.7,
  "top_p": 1,
  "max_tokens": 2000,
  "presence_penalty": 0,
  "frequency_penalty": 0
}'::jsonb,
ADD COLUMN IF NOT EXISTS system_prompt text DEFAULT 'You are a helpful AI assistant.',
ADD COLUMN IF NOT EXISTS knowledge_retrieval_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS knowledge_retrieval_settings jsonb DEFAULT '{
  "chunk_size": 1000,
  "chunk_overlap": 200,
  "similarity_threshold": 0.7,
  "max_chunks_to_retrieve": 5
}'::jsonb;

-- Lisätään tietämyskannan hallintaa varten taulu
CREATE TABLE IF NOT EXISTS public.knowledge_bases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  settings JSONB DEFAULT '{
    "similarity_threshold": 0.7,
    "max_documents_per_query": 5
  }'::jsonb NOT NULL
);

-- Luodaan indeksi tietämyskannoille
CREATE INDEX ix_knowledge_bases_chatbot_id ON public.knowledge_bases(chatbot_id);
CREATE INDEX ix_knowledge_bases_account_id ON public.knowledge_bases(account_id);

-- Käyttöoikeudet tietämyskannoille
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_bases TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_bases TO service_role;

-- RLS tietämyskannoille
ALTER TABLE public.knowledge_bases ENABLE ROW LEVEL SECURITY;

-- SELECT(public.knowledge_bases)
CREATE POLICY select_knowledge_bases
ON public.knowledge_bases
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- INSERT(public.knowledge_bases)
CREATE POLICY insert_knowledge_bases
ON public.knowledge_bases
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role_on_account(account_id)
);

-- UPDATE(public.knowledge_bases)
CREATE POLICY update_knowledge_bases
ON public.knowledge_bases
FOR UPDATE
TO authenticated
USING (
  public.has_role_on_account(account_id)
) WITH CHECK (
  public.has_role_on_account(account_id)
);

-- DELETE(public.knowledge_bases)
CREATE POLICY delete_knowledge_bases
ON public.knowledge_bases
FOR DELETE
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- Päivitetään documents_embeddings-taulu lisäämällä knowledge_base_id ja document_id
ALTER TABLE public.documents_embeddings
ADD COLUMN IF NOT EXISTS knowledge_base_id UUID REFERENCES public.knowledge_bases(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS chunk_index INTEGER DEFAULT 0 NOT NULL;

-- Luodaan indeksi embeddingeille
CREATE INDEX IF NOT EXISTS ix_documents_embeddings_knowledge_base_id ON public.documents_embeddings(knowledge_base_id);
CREATE INDEX IF NOT EXISTS ix_documents_embeddings_document_id ON public.documents_embeddings(document_id);

-- RLS politiikka documents_embeddings-taululle
CREATE POLICY select_documents_embeddings
ON public.documents_embeddings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.knowledge_bases kb
    WHERE kb.id = knowledge_base_id
    AND public.has_role_on_account(kb.account_id)
  )
);

-- Päivitetään documents-taulu lisäämällä knowledge_base_id
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS knowledge_base_id UUID REFERENCES public.knowledge_bases(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' NOT NULL,
ADD COLUMN IF NOT EXISTS chunks_count INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL;

-- Luodaan indeksi documenteille
CREATE INDEX IF NOT EXISTS ix_documents_knowledge_base_id ON public.documents(knowledge_base_id);