"use client"
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react'

export default function ProfileCard(){
  const [data, setData] = useState(null)
  const User = JSON.parse(localStorage.getItem("user")) 
  
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/staffskill/${User.staff_id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.staff_skills);
      })
  }, []);
    var skillsArray = null;
    console.log(data)
    if(data!= null){
      var skillsArray = Object.values(data);
    }
    
    return (
    <div className="flex max-w-md flex-col gap-4 ">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div>
        <div className="mb-2 block text-xl"> 
          {User.staff_fname + " " + User.staff_lname}
        </div>
        
      </div>
      <div>
      <div className="mb-2 block text-xl "> 
          {User.Email}
        </div>
      </div>
      


       </div> 

        
      
        



        
      
      
      
      
    
    )
}