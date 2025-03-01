"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { apiService } from "@/lib/api-service";
import { TodoEditForm } from "@/components/todo-edit-form";
import { toast } from "sonner";

export function TodoList({ todoKey }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [togglingId, setTogglingId] = useState(null); // Track which todo is being toggled

  const { data: todos, error, mutate } = useSWR(todoKey, apiService.getTodos);

  if (error) {
    toast.error("Failed to load todos");
  }

  const handleToggleComplete = async (id, completed, title) => {
    setTogglingId(id); // Set loading state for this todo
    try {
      await apiService.updateTodo(id, { completed: !completed });
      mutate(); // Refresh the todo list
      toast.success(
        completed ? `${title} marked incomplete` : `${title} completed!`
      );
    } catch (error) {
      toast.error("Failed to update todo status");
    } finally {
      setTogglingId(null); // Clear loading state
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteTodo(id);
      mutate();
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleSaveEdit = async (_id, data) => {
    try {
      await apiService.updateTodo(_id, data);
      mutate();
      setEditingTodo(null);
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  if (!todos) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No todos yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo._id}>
          <CardContent className="p-4">
            {editingTodo && editingTodo._id === todo._id ? (
              <TodoEditForm todo={todo} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {togglingId === todo._id ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() =>
                        handleToggleComplete(todo._id, todo.completed, todo.title)
                      }
                      disabled={togglingId === todo._id} // Disable while loading
                    />
                  )}
                  <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                    {todo.title}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(todo)}>
                    <Icons.edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(todo._id)}>
                    <Icons.trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}