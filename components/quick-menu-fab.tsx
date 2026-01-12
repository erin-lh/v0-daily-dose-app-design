"use client"

import { useState } from "react"
import { Plus, X, Check, Pill, PackageCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface QuickMenuFABProps {
  onMarkComplete: () => void
  onAddMeds: () => void
  onRefillComplete: () => void
}

export function QuickMenuFAB({ onMarkComplete, onAddMeds, onRefillComplete }: QuickMenuFABProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRefillClick = () => {
    setShowSuccess(true)
    onRefillComplete()
    setTimeout(() => {
      setShowSuccess(false)
      setIsOpen(false)
    }, 1500)
  }

  const handleMarkComplete = () => {
    setIsOpen(false)
    onMarkComplete()
  }

  const handleAddMeds = () => {
    setIsOpen(false)
    onAddMeds()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Quick Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full h-9 w-9 -mr-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {showSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Great Work!</h4>
                <p className="text-sm text-muted-foreground mt-1">Box marked as refilled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Mark Complete */}
                <button
                  onClick={handleMarkComplete}
                  className="w-full p-5 rounded-2xl border-2 border-border/30 bg-background hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground">Mark Complete</h4>
                      <p className="text-sm text-muted-foreground">Check off today's doses</p>
                    </div>
                  </div>
                </button>

                {/* Add New Meds */}
                <button
                  onClick={handleAddMeds}
                  className="w-full p-5 rounded-2xl border-2 border-border/30 bg-background hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground">Add New Meds</h4>
                      <p className="text-sm text-muted-foreground">Add medication to your routine</p>
                    </div>
                  </div>
                </button>

                {/* Refilled Box */}
                <button
                  onClick={handleRefillClick}
                  className="w-full p-5 rounded-2xl border-2 border-border/30 bg-background hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <PackageCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground">Refilled Box</h4>
                      <p className="text-sm text-muted-foreground">Mark pill box as refilled</p>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed right-6 bottom-28 z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center",
          isOpen && "opacity-0 pointer-events-none",
        )}
      >
        <Plus className="w-6 h-6" />
      </button>
    </>
  )
}
