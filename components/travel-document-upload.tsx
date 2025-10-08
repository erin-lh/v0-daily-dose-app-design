"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TravelDocument } from "@/lib/types"

interface TravelDocumentUploadProps {
  documents: TravelDocument[]
  onUpload: (document: Omit<TravelDocument, "id" | "uploadedAt">) => void
  onDelete: (id: string) => void
}

export function TravelDocumentUpload({ documents, onUpload, onDelete }: TravelDocumentUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "prescription" | "bottle-label") => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    // Simulate upload - in production, this would upload to storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const imageUrl = reader.result as string
      onUpload({
        type,
        imageUrl,
        fileName: file.name,
        notes: "",
      })
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label
          className={cn(
            "flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer",
            uploading
              ? "border-primary/30 bg-primary/5"
              : "border-border/30 hover:border-primary/50 hover:bg-primary/5",
          )}
        >
          <FileText className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium text-center">Prescription Script</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, "prescription")}
            disabled={uploading}
          />
        </label>

        <label
          className={cn(
            "flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer",
            uploading
              ? "border-primary/30 bg-primary/5"
              : "border-border/30 hover:border-primary/50 hover:bg-primary/5",
          )}
        >
          <ImageIcon className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium text-center">Bottle Label</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, "bottle-label")}
            disabled={uploading}
          />
        </label>
      </div>

      {documents.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Saved Documents</h3>
          <div className="grid grid-cols-2 gap-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="relative overflow-hidden group">
                <img src={doc.imageUrl || "/placeholder.svg"} alt={doc.fileName} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                  <p className="text-xs text-white font-medium truncate">{doc.fileName}</p>
                  <p className="text-[10px] text-white/70 capitalize">{doc.type.replace("-", " ")}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDelete(doc.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
