import { connectdb } from "@/lib/mongodb";

export async function GET(req : Request, {params} : { params : {id : string}}){
    await connectdb();
    const id = await params

    
}