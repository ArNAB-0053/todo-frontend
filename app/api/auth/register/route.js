import { NextResponse } from "next/server"

// This would typically connect to your database
const users = []

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // In a real app, you would hash the password before storing it
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, this would be hashed
    }

    // Add user to the array (in a real app, you would save to a database)
    users.push(newUser)

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

