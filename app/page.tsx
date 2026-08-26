import Image from 'next/image'

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/todo")
  const data = await res.json()
  const todos = data.todo

 
  return (
    <div className=' w-full max-w-sm'>
      <h1>Todo</h1>
      {todos.map((todo) => (
        <div className="" key={todo._id}>
          <p>{todo.title}</p>
          <p>{todo.desc}</p>

        </div>
      ) )}
    </div>
  )
}
