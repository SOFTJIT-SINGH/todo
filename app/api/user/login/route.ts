import { connectdb } from '@/lib/mongodb'
import { loginschema } from '@/lib/validations/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/lib/user.model'
import { Message } from 'radix-ui/form'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await loginschema.safeParse(body)
    if (!res.success) {
      return NextResponse.json(
        {
          message: 'Login Error',
        },
        { status: 401 },
      )
    }

    const { email, password } = await res.data

    await connectdb()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        {
          message: 'Invalid Credentials',
        },
        {
          status: 401,
        },
      )
    }

    const checkpass = await bcrypt.compare(password, user.password)

    if (!checkpass) {
      return NextResponse.json(
        {
          message: 'Invalid password',
        },
        { status: 401 },
      )
    }

    return NextResponse.json({
        message : "User Got Login",
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            phone : user.phone
        }
    },{
        status : 200
    })

  } catch (error) {
    console.log('Login error')
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 },
    )
  }
}
