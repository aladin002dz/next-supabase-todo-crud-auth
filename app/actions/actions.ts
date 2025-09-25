"use server"

import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"
import { getUser } from "./auth"

export async function createTask(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string

    // Get the authenticated user
    const user = await getUser()
    if (!user) {
        throw new Error("User must be authenticated to create tasks")
    }

    // Validate that title is not empty
    if (!title || title.trim() === "") {
        throw new Error("Title is required")
    }

    await prisma.todo.create({
        data: {
            title: title.trim(),
            description: description?.trim() ?? "",
            userId: user.id, // Associate todo with the authenticated user
        }
    })

    revalidatePath("/")
}

export async function deleteTask(id: string) {
    // Get the authenticated user
    const user = await getUser()
    if (!user) {
        throw new Error("User must be authenticated to delete tasks")
    }

    // Only allow deletion of user's own todos
    await prisma.todo.delete({
        where: {
            id: id,
            userId: user.id, // Ensure user can only delete their own todos
        }
    })

    revalidatePath("/")
}   