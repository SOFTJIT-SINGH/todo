import { connectdb } from '@/lib/mongodb'
import User from '@/lib/user.model'
import { registerschema } from '@/lib/validations/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await registerschema.safeParse(body)

    if (!res.success) {
      return NextResponse.json(
        {
          message: 'error generating',
        },
        {
          status: 400,
        },
      )
    }

    const { username, phone, email, password } = res.data

    await connectdb()

    const exist = await User.findOne({ email: email })
    if (exist) {
      return NextResponse.json(
        {
          message: 'Email Already registered',
        },
        {
          status: 401,
        },
      )
    }

    const hashpass = await bcrypt.hash(password, 10)

    const user = await User.create({
      username: username,
      phone: phone,
      email: email,
      password: hashpass,
    })

    return NextResponse.json(
      {
        message: 'User Registered Successfully',
        // data: user,
        user: {
          id: user._id,
          username,
          email,
          phone
        },
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.log('Error in user registration')

    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      },
    )
  }
}
