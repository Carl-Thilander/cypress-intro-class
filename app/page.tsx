import { db } from "@/prisma/db";
import TodoList from "./ui/todo-list";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      <h1 className="text-5xl font-bold mb-4 p-4">To do List</h1>
      <p>My lists</p>
      <TodoList defaultTodos={todos} />
    </main>
  );
}
