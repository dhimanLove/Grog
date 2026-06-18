
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_downloads" ON downloads FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_downloads" ON downloads FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_downloads" ON downloads FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_downloads" ON downloads FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
