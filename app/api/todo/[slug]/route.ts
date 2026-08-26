import { connectdb } from "@/lib/mongodb";
import Todo from "@/lib/todo.model";
import { NextResponse } from "next/server";

export async function GET(req : Request, {params} : {params : {slug : string}}) {
    await connectdb();
     const {slug} = await params;
     const todo  = await Todo.findById(slug)

     if (!todo){
        return NextResponse.json({message : "Not found"}, {status: 400})
     }
     
     return NextResponse.json({
        data : todo
     })
}
export async function PUT (req : Request, {params} : {params : {slug : string}}){

    await connectdb()
    const {slug} = await params;

    const body = await req.json()
    const update = await Todo.findByIdAndUpdate(slug, body, { new : true, runValidators : true})

    if (!update){
        return NextResponse.json({ success : false, message : "not updated"}, {status : 400})
    }
 return NextResponse.json({message : "updated", data : update}, {status : 200})

}

export async function PATCH (req : Request, {params} : {params : {slug : string}}){

    await connectdb()
    const {slug} = await params;

    const body = await req.json()
    const update = await Todo.findByIdAndUpdate(slug, { $set : body }, { new : true, runValidators : true})

    if (!update){
        return NextResponse.json({ success : false, message : "not patched"}, {status : 400})
    }
 return NextResponse.json({message : "patched", data : update}, {status : 200})

}



export async function DELETE (req : Request, 
    {params} : {params : {slug : string}}
) {
    await connectdb();

    const {slug} = await params;
    
    const del = await Todo.findByIdAndDelete(slug)

    if(!del){
        return NextResponse.json({
            message :  "Not deleted"
        })
    }

    return NextResponse.json({
        message : "Deleted",
        data : del
    })
    
}