export interface Task {
    id: string
    title: string
    description: string
    userId?: string // Optional since we don't always need to expose this
}