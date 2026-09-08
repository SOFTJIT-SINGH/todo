

import { connectdb } from '@/lib/mongodb'
// import Todo from '@/lib/todo.model'
import User from '@/lib/user.model'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectdb()
  const user = await User.find()
  return NextResponse.json({
    message: 'User Fetched',
    data: user,
  })
}

// export async function POST (req : Request){
//     await connectdb()
//     const res = await req.json()

//     // const res = 
    
//     const user = await User.create({
//         username : res.username,
//         password : res.password,
//         phone : res.phone,
//     })

//     return NextResponse.json({
//         message : "User created",
//         data : user,
//     },{
//         status : 201
//     })
// }
