
//Mongodb connection
import { connectionDB } from '@/lib/db'
//data model 
import Prompt from '@/models/prompt'
import { NextRequest, NextResponse } from 'next/server'


 //GET A Prompt
export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
    //connect to mongodb
    await connectionDB()

    //get an id from url 
    const { id }= await params 
    console.log(id);
    
    //GET a prompt from mongodb
    const getAPrompt = await Prompt.findById(id)
    console.log(getAPrompt);
    return NextResponse.json({
        message:"Successfuly get a prompt",getAPrompt
    })
    }
    catch{
 return NextResponse.json({
        message:"Could not load prompt"
    }, { status:500 })
    }
}


 //UPDATE A Prompt
export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
    //connect to mongodb
    await connectionDB()

    //get an id from url 
    const { id }= await params 
    console.log(id);

     //Define Request Body 
    const body = await request.json()
    
    //PUT a prompt from mongodb
    const putPrompt = await Prompt.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    if (!putPrompt) {
        return NextResponse.json({ message: "Prompt not found" }, { status: 404 })
    }
   
    return NextResponse.json({
        message:"Successfully updated prompt",prompt:putPrompt
    })
    }
    catch{
 return NextResponse.json({
        message:"Could not update prompt"
    }, { status:500 })
    }
}

//SAVE OR UNSAVE A Prompt
export async function PATCH(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
        await connectionDB()
        const { id } = await params
        const body = await request.json()

        if (typeof body.favorite !== "boolean") {
            return NextResponse.json({ message: "A favorite boolean is required" }, { status: 400 })
        }

        const prompt = await Prompt.findByIdAndUpdate(id, { favorite: body.favorite }, { new: true })
        if (!prompt) {
            return NextResponse.json({ message: "Prompt not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Saved status updated", prompt })
    } catch {
        return NextResponse.json({ message: "Could not update saved status" }, { status: 500 })
    }
}

//DELETE A Prompt
export async function DELETE(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
    //connect to mongodb
    await connectionDB()

    //get an id from url 
    const { id }= await params 
    console.log(id);
    
    //DELETE a prompt from mongodb
    const deletePrompt = await Prompt.findByIdAndDelete(id)
    if (!deletePrompt) {
        return NextResponse.json({ message: "Prompt not found" }, { status: 404 })
    }
   
    return NextResponse.json({
        message:"Successfully deleted prompt",prompt:deletePrompt
    })
    }
    catch(err){
 return NextResponse.json({ message:"Error while deleting prompt" }, { status:500 })
    }
}
