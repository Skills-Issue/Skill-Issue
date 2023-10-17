"use client"
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react'

export default function ProfileCard(){
  const [data, setData] = useState(null)
  const User = JSON.parse(localStorage.getItem("user")) 
  
  
    
    return (
    <div className="flex max-w-md flex-col gap-2 ">
      
      <div>
        <div className="mb-1 block text-xl font-semibold text-gray-700"> 
          {User.staff_fname + " " + User.staff_lname}
        </div>
        
      </div>
      <div>
      <div className="mb-1 block text-sm "> 
          Email: <span className='text-blue-800'>{User.email}</span>
        </div>
      </div>
      <div>
        <div className="mb-1 block text-sm "> 
          Department: <span className='text-blue-800'>{User.dept}</span>
          </div>
      </div>
       </div> 
      
    
    )
}