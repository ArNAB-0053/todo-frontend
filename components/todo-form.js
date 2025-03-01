"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { apiService } from "@/lib/api-service";
import { mutate } from "swr";
import { toast } from "sonner";

export function TodoForm({ todoKey }) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Todo title cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      await apiService.createTodo({ title, completed: false });
      setTitle("");
      mutate(todoKey); // Use the shared key
      toast.success("Todo created successfully");
    } catch (error) {
      toast.error("Failed to create todo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center md:space-x-12 max-md:flex-col max-md:space-y-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        disabled={isLoading}
        className="h-[3rem]"
      />
      <Button type="submit" disabled={isLoading} className="h-[3rem] w-[7rem]">
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.plus className="mr-2 h-4 w-4" />}
        Add
      </Button>
    </form>
  );
}