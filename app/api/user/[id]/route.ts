import { connectdb } from '@/lib/mongodb'
import User from '@/lib/user.model'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectdb()
  const { id } = await params
  const user = await User.findById(id)

  if (!user) {
    return NextResponse.json({
      message: ' Failed to fetch',
    })
  }
  return NextResponse.json(
    {
      message: 'User fetched',
      data: user,
    },
    { status: 200 },
  )
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectdb()
  const { id } = await params
  const body = await req.json()
  const updateduser = await User.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  })

  if (!updateduser) {
    return NextResponse.json(
      {
        message: 'not updated',
      },
      {
        status: 400,
      },
    )
  }
  return NextResponse.json(
    {
      message: 'Updated user',
      data: updateduser,
    },
    { status: 201 },
  )
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectdb()
  const { id } = await req.json()
  const del = await User.findByIdAndDelete(id)

  if (!del) {
    return NextResponse.json(
      {
        message: 'Not deleted',
      },
      { status: 400 },
    )
  }

  return NextResponse.json(
    {
      message: 'Deleted',
    },
    { status: 204 },
  )
}
