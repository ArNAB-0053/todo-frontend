import axios from "axios"

const BASE_URL=process.env.NEXT_PUBLIC_API_URL
const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// API service functions
export const apiService = {
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData)
    return response.data
  },

  logout: async () => {
    localStorage.removeItem("token")
  },

  getTodos: async (url) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },  

  getTodo: async (id) => {
    const response = await api.get(`/api/todos/${id}`)
    return response.data
  },

  createTodo: async (todoData) => {
    const response = await api.post("/api/todos/post", todoData)
    return response.data
  },

  updateTodo: async (id, todoData) => {
    const response = await api.put(`/api/todos/${id}`, todoData)
    return response.data
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/api/todos/${id}`)
    return response.data
  },

  getUser: async (id) => {
    const response = await api.get(`/api/users/${id}`)
    // console.log(response)
    return response.data
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/api/users/${id}`, userData)
    return response.data
  },
}
