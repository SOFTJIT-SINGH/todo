import { connectdb } from '@/lib/mongodb'
import Todo from '@/lib/todo.model'
import { todoshema } from '@/lib/validations/todo'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectdb()
  const todo = await Todo.find()
  return NextResponse.json(
    {
      message: 'Data fetched',
      todo,
    },
    {
      status: 200,
    },
  )
}

export async function POST(request: Request) {
  await connectdb()
  const body = await request.json()
  const res = todoshema.safeParse(body)

  if (!res.success){
    return NextResponse.json({
      message : "Invalid input",
      detail : res.error,
    },
  {
    status : 400,
  })
  }
  const todo = await Todo.create({
    title: res.data.title,
    desc: res.data.desc,
  })
  return NextResponse.json(todo, {
    status: 201,
  })
}
