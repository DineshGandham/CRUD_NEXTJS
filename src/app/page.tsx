"use client";
import Link from 'next/link';
import { useState , useEffect } from 'react';

interface Item {
  _id : string,
  name : string;
  description : string;
}

export default function Home() {

const [items,setItems] = useState<Item[]>([]);;

useEffect(() => {
  fetch('/api/items',{
    method: 'GET',
    headers : {
        'content-Type' : 'application/json'
    },
  })
  .then(res => res.json())
  .then(data=>setItems(data));
},[])

const deleteItem= async (id:string)=>{
  await fetch('/api/items',{
    method : "DELETE",
    body : JSON.stringify({id})
  });
  setItems(items.filter(item => item._id !=id));
}
  return (
    <div>
      <h1>Items List</h1>
      <Link href="/create">
        <button className="bg-green-500 text-white rounded px-4 py-2 mb-4">
          Add New Item
        </button>
      </Link>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button className="bg-red-500 text-white rounded px-4 py-2 mb-4" onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
