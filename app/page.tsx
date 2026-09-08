import Image from 'next/image'

interface TodoItem {
  _id: string;
  title: string;
  desc: string;
}

export default async function Home() {
  let todos: TodoItem[] = []
  try {
    const res = await fetch("http://localhost:3000/api/todo", { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      todos = data.todo || []
    } else {
      console.error("Failed to fetch todos", res.status)
    }
  } catch (e) {
    console.error("Fetch error", e)
  }
 
  return (
    <div className=' w-full max-w-sm'>
      <h1>Todo</h1>
      {todos.map((todo: TodoItem) => (
        <div className="" key={todo._id}>
          <p>{todo.title}</p>
          <p>{todo.desc}</p>
        </div>
      ) )}
    </div>
  )
}
