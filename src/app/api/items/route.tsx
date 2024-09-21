import { NextRequest,NextResponse } from "next/server";
import dbConnect from '@/lib/mongodb';
import Item from "@/models/Item";

export async function POST(req : NextRequest){
    await dbConnect();
    const {name , description} = await req.json();
    const newItem = new Item({name , description});
    await newItem.save();

    return NextResponse.json(newItem);
}