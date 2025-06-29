/*
  # Create pitch decks table

  1. New Tables
    - `pitch_decks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `description` (text)
      - `template` (text)
      - `tone` (text)
      - `slides` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pitch_decks` table
    - Add policies for authenticated users to manage their own decks
*/

CREATE TABLE IF NOT EXISTS pitch_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  template text NOT NULL DEFAULT 'minimal',
  tone text NOT NULL DEFAULT 'investor',
  slides jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pitch_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pitch decks"
  ON pitch_decks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own pitch decks"
  ON pitch_decks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pitch decks"
  ON pitch_decks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pitch decks"
  ON pitch_decks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS pitch_decks_user_id_idx ON pitch_decks(user_id);
CREATE INDEX IF NOT EXISTS pitch_decks_updated_at_idx ON pitch_decks(updated_at DESC);