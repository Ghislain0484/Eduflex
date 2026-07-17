import { supabase } from '@/lib/supabase'

/**
 * Attempts to upload a file to Supabase Storage bucket.
 * Falls back to base64 string if the upload fails or the bucket is not configured.
 */
export async function uploadToStorage(
  file: File,
  bucket: string,
  userId: string
): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    // Attempt Supabase Storage upload
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (error) {
      console.warn('Supabase storage upload failed, falling back to base64 reader:', error.message)
      return await fileToBase64(file)
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return urlData.publicUrl || await fileToBase64(file)
  } catch (err) {
    console.warn('Storage upload error, falling back to base64:', err)
    return await fileToBase64(file)
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}
