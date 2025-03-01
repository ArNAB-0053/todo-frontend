"use client";

import { useState } from "react";
import { TodoList } from "@/components/todo-list";
import { TodoForm } from "@/components/todo-form";
import { jwtDecode } from "jwt-decode";

export function DashboardClient() {
  const getUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      // console.error("Error decoding token:", error);
      return null;
    }
  };

  const userId = getUserId();
  const todoKey = userId ? `/api/todos/get/${userId}` : null;

  return (
    <>
      <TodoForm todoKey={todoKey} />
      <TodoList todoKey={todoKey} />
    </>
  );
}