import { connectdb } from '@/lib/mongodb';
import User from '@/lib/user.model';
import mongoose from 'mongoose'
import { NextResponse } from 'next/server';

export async function GET() {
    await connectdb()

    const users = await User.find()
    
    return NextResponse.json({
        message : "users fetched",
        users
    })
}

export async function POST(req : Request){
    await connectdb()

    const body = await req.json()

    const user = await User.create({
        username : body.username,
        password : body.password
    })

    return NextResponse.json(user,{
        status  : 201
    })
}