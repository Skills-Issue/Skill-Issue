"use client"
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react'

export default function ProfileCard(){
  const [data, setData] = useState(null)
  const User = JSON.parse(localStorage.getItem("user")) 
  
  
    
    return (
    <div className="flex max-w-md flex-col gap-4 ">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div>
        <div className="mb-1 block text-xl"> 
          {User.staff_fname + " " + User.staff_lname}
        </div>
        
      </div>
      <div>
      <div className="mb-1 block text-xl "> 
          {User.email}
        </div>
      </div>
       </div> 
      
    
    )
}