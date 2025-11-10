"use client"

import { useState, useRef } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  maxSizeMB?: number
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  maxSizeMB = 10
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Check if adding these files would exceed max
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    setUploading(true)

    try {
      const uploadPromises = files.map(async (file) => {
        // Check file size
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is ${maxSizeMB}MB`)
          return null
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`)
          return null
        }

        // Upload to Vercel Blob
        const filename = `${Date.now()}-${file.name}`
        setUploadProgress(prev => ({ ...prev, [filename]: 0 }))

        const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
          method: 'POST',
          body: file,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        setUploadProgress(prev => ({ ...prev, [filename]: 100 }))

        return data.url
      })

      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]
      onImagesChange([...images, ...uploadedUrls])
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload images. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress({})
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      // Create a synthetic change event
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        files.forEach(file => dataTransfer.items.add(file))
        input.files = dataTransfer.files
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading || images.length >= maxImages}
      />

      <div
        onClick={() => !uploading && images.length < maxImages && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors ${
          uploading || images.length >= maxImages
            ? 'cursor-not-allowed opacity-50'
            : 'hover:border-primary/50 cursor-pointer'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading images...</p>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG up to {maxSizeMB}MB ({images.length}/{maxImages} images)
            </p>
          </>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveImage(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
