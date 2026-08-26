import Image from 'next/image'

export default async function Home() {
  const res = await fetch("/api/todo")
  const todos = await res.json
  return (
    <div className=' w-full max-w-sm'>
      <h1>Todo</h1>
{todos.map((todo)=> (<div key={todo._id}>
  <p>{todo.title}</p>
  <p>{todo.desc}</p>
</div>)
}
    </div>
  )
}
