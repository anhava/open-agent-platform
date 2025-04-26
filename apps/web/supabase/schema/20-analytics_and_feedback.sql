-- Palautetaulu viestien arviointia varten
CREATE TABLE IF NOT EXISTS public.message_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id BIGINT NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_email VARCHAR(255)
);

-- Indeksit palautetaululle
CREATE INDEX ix_message_feedbacks_message_id ON public.message_feedbacks(message_id);
CREATE INDEX ix_message_feedbacks_conversation_id ON public.message_feedbacks(conversation_id);
CREATE INDEX ix_message_feedbacks_chatbot_id ON public.message_feedbacks(chatbot_id);
CREATE INDEX ix_message_feedbacks_account_id ON public.message_feedbacks(account_id);

-- Käyttöoikeudet
GRANT SELECT, INSERT ON public.message_feedbacks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.message_feedbacks TO service_role;

-- RLS palautetaululle
ALTER TABLE public.message_feedbacks ENABLE ROW LEVEL SECURITY;

-- SELECT(public.message_feedbacks)
CREATE POLICY select_message_feedbacks
ON public.message_feedbacks
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- INSERT(public.message_feedbacks)
CREATE POLICY insert_message_feedbacks
ON public.message_feedbacks
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role_on_account(account_id)
);

-- Analytiikkataulu chatbottien käytön seurantaan
CREATE TABLE IF NOT EXISTS public.chatbot_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  conversations_count INTEGER DEFAULT 0 NOT NULL,
  messages_count INTEGER DEFAULT 0 NOT NULL,
  tokens_used INTEGER DEFAULT 0 NOT NULL,
  avg_response_time NUMERIC DEFAULT 0 NOT NULL,
  avg_rating NUMERIC DEFAULT 0 NOT NULL,
  unique_users INTEGER DEFAULT 0 NOT NULL,
  
  UNIQUE(chatbot_id, date)
);

-- Indeksit analytiikkatauluun
CREATE INDEX ix_chatbot_analytics_chatbot_id ON public.chatbot_analytics(chatbot_id);
CREATE INDEX ix_chatbot_analytics_account_id ON public.chatbot_analytics(account_id);
CREATE INDEX ix_chatbot_analytics_date ON public.chatbot_analytics(date);

-- Käyttöoikeudet
GRANT SELECT ON public.chatbot_analytics TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chatbot_analytics TO service_role;

-- RLS analytiikkatauluun
ALTER TABLE public.chatbot_analytics ENABLE ROW LEVEL SECURITY;

-- SELECT(public.chatbot_analytics)
CREATE POLICY select_chatbot_analytics
ON public.chatbot_analytics
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- Funktio uusien viestien laskemiseen
CREATE OR REPLACE FUNCTION public.update_chatbot_analytics()
RETURNS TRIGGER AS $$
DECLARE
  target_account_id UUID;
  today DATE := CURRENT_DATE;
BEGIN
  -- Haetaan account_id
  SELECT account_id INTO target_account_id
  FROM public.chatbots
  WHERE id = NEW.chatbot_id;

  -- Päivitetään tai lisätään analytiikkataulu
  INSERT INTO public.chatbot_analytics (
    chatbot_id, 
    account_id,
    date, 
    messages_count
  )
  VALUES (
    NEW.chatbot_id,
    target_account_id,
    today,
    1
  )
  ON CONFLICT (chatbot_id, date)
  DO UPDATE SET
    messages_count = public.chatbot_analytics.messages_count + 1;

  -- Päivitetään keskustelujen määrä, jos kyseessä on uusi keskustelu
  IF NOT EXISTS (
    SELECT 1 FROM public.messages 
    WHERE conversation_id = NEW.conversation_id 
    AND id != NEW.id
  ) THEN
    UPDATE public.chatbot_analytics
    SET conversations_count = conversations_count + 1
    WHERE chatbot_id = NEW.chatbot_id
    AND date = today;
  END IF;

  -- Päivitetään uniikkien käyttäjien määrä
  WITH unique_users_today AS (
    SELECT COUNT(DISTINCT c.user_email) as count
    FROM public.conversations c
    WHERE c.chatbot_id = NEW.chatbot_id
    AND DATE(c.created_at) = today
    AND c.user_email IS NOT NULL
  )
  UPDATE public.chatbot_analytics
  SET unique_users = (SELECT count FROM unique_users_today)
  WHERE chatbot_id = NEW.chatbot_id
  AND date = today;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger analytiikan päivittämiseen
CREATE TRIGGER on_message_created
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE PROCEDURE public.update_chatbot_analytics();