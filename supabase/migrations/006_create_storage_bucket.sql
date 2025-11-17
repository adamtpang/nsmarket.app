-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listings-images', 'listings-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies to allow public uploads and reads
CREATE POLICY "Anyone can upload listing images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'listings-images');

CREATE POLICY "Anyone can read listing images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listings-images');

CREATE POLICY "Anyone can update their listing images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'listings-images');

CREATE POLICY "Anyone can delete listing images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'listings-images');
