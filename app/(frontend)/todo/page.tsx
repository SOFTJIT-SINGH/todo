import Todoadd from '@/components/Todoadd'

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/todo')
  const data = await res.json()
  const todos = data.todo
  return (
    <div className=' w-full max-w-sm'>
      <h1>Todo</h1>
      <Todoadd todos={todos} />
    </div>
  )
}
