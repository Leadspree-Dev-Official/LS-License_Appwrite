-- Add new columns to licenses table
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS platform text;
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS remarks text;
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS account_type text DEFAULT 'buyer';
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS extension_id text;