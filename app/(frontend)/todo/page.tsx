import Todoadd from '@/components/Todoadd'

export default async function Home() {
  let todos = []
  try {
    const res = await fetch('http://localhost:3000/api/todo', { cache: 'no-store' })
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
      <Todoadd todos={todos} />
    </div>
  )
}
