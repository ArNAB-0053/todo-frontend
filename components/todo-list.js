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
import { jwtDecode } from "jwt-decode";

export function TodoList() {
  const [editingTodo, setEditingTodo] = useState(null);

  const getUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  const userId = getUserId();
  // console.log(userId)
  
  const { data: todos, error, mutate } = useSWR(
    userId ? `/api/todos/get/${userId}` : null, 
    userId ? apiService.getTodos : null
  );
  
  if (error) {
    toast.error("Failed to load todos");
  }
  
  const handleToggleComplete = async (id, completed) => {
    try {
      await apiService.updateTodo(id, { completed: !completed });
      mutate();
    } catch (error) {
      toast.error("Failed to update todo status");
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
  
  // Loading state
  if (!todos) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // Empty state
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No todos yet. Add one to get started!</p>
      </div>
    );
  }
  
  // Render todos
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
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleComplete(todo._id, todo.completed)}
                  />
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