import { connectdb } from '@/lib/mongodb'
import Todo from '@/lib/todo.model'
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

export async function POST(request : Request) {
    await connectdb();
     const body = await request.json();

     const todo = await Todo.create({
        title : body.title,
        desc : body.desc,
     })
     return NextResponse.json(todo,{
        status : 201
     });
}