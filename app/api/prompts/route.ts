
//Mongodb connection
import { connectionDB } from '@/lib/db'
//data model 
import Prompt from '@/models/prompt'
import { NextRequest, NextResponse } from 'next/server'

 //GET ALL Prompts 
export async function GET(request:NextRequest) {
    try{
        //connect to mongodb
    await connectionDB()
    //GET all prompts from mongodb
    const allPrompts = await Prompt.find()

    return NextResponse.json({
        message:"Successfuly get all the prompts",allPrompts
    })
    }
    catch(err){
 return NextResponse.json({
        message:"Error while getting all the prompts",err
    })
    }
}


 //POST ADD A Prompt
export async function POST(request:NextRequest) {
    try{
    //connect to mongodb
    await connectionDB()

    //Define Request Body 
    const body = await request.json()

    //ADD Prompt
    const addPrompt = await Prompt.create(body)

    return NextResponse.json({
        message:"Successfuly add new prompt",prompt:addPrompt
    },{status:201})
    }
    catch(err){
 return NextResponse.json({
        message:"Error while adding a prompt"+err
    },{status:500})
    }
}