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

export async function GET(){
    await dbConnect();
    const items = await Item.find({});

    return NextResponse.json(items)
}

export async function DELETE(req : NextRequest){
    await dbConnect();
    const {id} = await req.json();
    const item = await Item.findByIdAndDelete(id);

    console.log(item)
    return NextResponse.json({ message: 'Item deleted' });
}

export async function PUT(req: NextRequest) {
    await dbConnect();
  
    const { id, name, description } = await req.json();
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
  
    return NextResponse.json(updatedItem);
  }