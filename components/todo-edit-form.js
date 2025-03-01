"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export function TodoEditForm({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    setIsLoading(true)
    await onSave(todo._id, { title })
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Edit todo..."
        disabled={isLoading}
        autoFocus
      />
      <div className="flex space-x-2">
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <Icons.check className="h-4 w-4" />}
          <span className="sr-only">Save</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isLoading}>
          <Icons.x className="h-4 w-4" />
          <span className="sr-only">Cancel</span>
        </Button>
      </div>
    </form>
  )
}

