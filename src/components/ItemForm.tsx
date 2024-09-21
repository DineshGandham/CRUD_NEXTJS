"use client" //mentioned because use the component as client side
import React, { useState } from "react";
import { useRouter } from "next/router";

interface FormState {
    name : string;
    description : string;
}

export default function ItemForm() {
  const [forms, setForms] = useState<FormState>({
    name: "",
    description: "",
  });
  const router = useRouter();
  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      const {name , value} = e.target;
    setForms(prevState => ({
        ...prevState,
        [name]:value,
    }))
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const res = await fetch('',{
            method: 'POST',
            headers : {
                'content-Type' : 'application/json'
            },
            body : JSON.stringify(forms)
        });
        if(!res.ok){
            throw new Error('Failed to Add Items');
        }

        setForms({name:'',description:''})
        
        router.push('/');

    }catch(error){
        console.error('Error Adding Items:', error)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name = "name"
            className="border rounded p-2 w-full text-black"
            value={forms.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="border rounded p-2 w-full text-black"
            rows={4}
            value={forms.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>
    </>
  );
}
