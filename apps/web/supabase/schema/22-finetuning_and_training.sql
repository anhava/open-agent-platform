-- Fine-tuning datasettien hallintataulu
CREATE TABLE IF NOT EXISTS public.fine_tuning_datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  examples_count INTEGER DEFAULT 0 NOT NULL,
  file_id VARCHAR(255),
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL
);

-- Indeksit fine-tuning dataseteille
CREATE INDEX ix_fine_tuning_datasets_account_id ON public.fine_tuning_datasets(account_id);
CREATE INDEX ix_fine_tuning_datasets_chatbot_id ON public.fine_tuning_datasets(chatbot_id);

-- Käyttöoikeudet
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fine_tuning_datasets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fine_tuning_datasets TO service_role;

-- RLS fine-tuning dataseteille
ALTER TABLE public.fine_tuning_datasets ENABLE ROW LEVEL SECURITY;

-- SELECT(public.fine_tuning_datasets)
CREATE POLICY select_fine_tuning_datasets
ON public.fine_tuning_datasets
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- INSERT(public.fine_tuning_datasets)
CREATE POLICY insert_fine_tuning_datasets
ON public.fine_tuning_datasets
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role_on_account(account_id)
);

-- UPDATE(public.fine_tuning_datasets)
CREATE POLICY update_fine_tuning_datasets
ON public.fine_tuning_datasets
FOR UPDATE
TO authenticated
USING (
  public.has_role_on_account(account_id)
) WITH CHECK (
  public.has_role_on_account(account_id)
);

-- DELETE(public.fine_tuning_datasets)
CREATE POLICY delete_fine_tuning_datasets
ON public.fine_tuning_datasets
FOR DELETE
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- Taulu koulutusesimerkeille
CREATE TABLE IF NOT EXISTS public.training_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id UUID NOT NULL REFERENCES public.fine_tuning_datasets(id) ON DELETE CASCADE,
  system_prompt TEXT,
  user_message TEXT NOT NULL,
  assistant_message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  source VARCHAR(50) DEFAULT 'manual' NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL
);

-- Indeksi koulutusesimerkeille
CREATE INDEX ix_training_examples_dataset_id ON public.training_examples(dataset_id);

-- Käyttöoikeudet
GRANT SELECT, INSERT, UPDATE, DELETE ON public.training_examples TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.training_examples TO service_role;

-- RLS koulutusesimerkeille
ALTER TABLE public.training_examples ENABLE ROW LEVEL SECURITY;

-- SELECT(public.training_examples)
CREATE POLICY select_training_examples
ON public.training_examples
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.fine_tuning_datasets d
    WHERE d.id = dataset_id
    AND public.has_role_on_account(d.account_id)
  )
);

-- INSERT(public.training_examples)
CREATE POLICY insert_training_examples
ON public.training_examples
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.fine_tuning_datasets d
    WHERE d.id = dataset_id
    AND public.has_role_on_account(d.account_id)
  )
);

-- UPDATE(public.training_examples)
CREATE POLICY update_training_examples
ON public.training_examples
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.fine_tuning_datasets d
    WHERE d.id = dataset_id
    AND public.has_role_on_account(d.account_id)
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.fine_tuning_datasets d
    WHERE d.id = dataset_id
    AND public.has_role_on_account(d.account_id)
  )
);

-- DELETE(public.training_examples)
CREATE POLICY delete_training_examples
ON public.training_examples
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.fine_tuning_datasets d
    WHERE d.id = dataset_id
    AND public.has_role_on_account(d.account_id)
  )
);

-- Taulu fine-tuned malleille
CREATE TABLE IF NOT EXISTS public.fine_tuned_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  dataset_id UUID NOT NULL REFERENCES public.fine_tuning_datasets(id) ON DELETE CASCADE,
  model_id VARCHAR(255),
  base_model VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  finished_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL
);

-- Indeksit fine-tuned malleille
CREATE INDEX ix_fine_tuned_models_account_id ON public.fine_tuned_models(account_id);
CREATE INDEX ix_fine_tuned_models_chatbot_id ON public.fine_tuned_models(chatbot_id);
CREATE INDEX ix_fine_tuned_models_dataset_id ON public.fine_tuned_models(dataset_id);

-- Käyttöoikeudet
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fine_tuned_models TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fine_tuned_models TO service_role;

-- RLS fine-tuned malleille
ALTER TABLE public.fine_tuned_models ENABLE ROW LEVEL SECURITY;

-- SELECT(public.fine_tuned_models)
CREATE POLICY select_fine_tuned_models
ON public.fine_tuned_models
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- INSERT(public.fine_tuned_models)
CREATE POLICY insert_fine_tuned_models
ON public.fine_tuned_models
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role_on_account(account_id)
);

-- UPDATE(public.fine_tuned_models)
CREATE POLICY update_fine_tuned_models
ON public.fine_tuned_models
FOR UPDATE
TO authenticated
USING (
  public.has_role_on_account(account_id)
) WITH CHECK (
  public.has_role_on_account(account_id)
);

-- DELETE(public.fine_tuned_models)
CREATE POLICY delete_fine_tuned_models
ON public.fine_tuned_models
FOR DELETE
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- Automaattinen fine-tuning datasetien päivitysfunktio
CREATE OR REPLACE FUNCTION public.update_fine_tuning_dataset_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.fine_tuning_datasets
    SET examples_count = examples_count + 1,
        updated_at = NOW()
    WHERE id = NEW.dataset_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.fine_tuning_datasets
    SET examples_count = examples_count - 1,
        updated_at = NOW()
    WHERE id = OLD.dataset_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggerit esimerkkien laskentaan
CREATE TRIGGER on_training_example_inserted
AFTER INSERT ON public.training_examples
FOR EACH ROW
EXECUTE PROCEDURE public.update_fine_tuning_dataset_count();

CREATE TRIGGER on_training_example_deleted
AFTER DELETE ON public.training_examples
FOR EACH ROW
EXECUTE PROCEDURE public.update_fine_tuning_dataset_count();