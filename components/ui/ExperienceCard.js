"use client"
import { useState,useEffect } from "react"

export default function ExperienceCard(){
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
        <div>
            <h1 className="text-2xl font-bold mb-4">Experience</h1>
      Skills: 
      {skillsArray?.map((skill, index) => (
        <span key={index} className="mb-2 text-2xl">
          <span className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5  py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {skill.skill_name}
            </span>
          
        </span>
        
      ))}
      </div>
    )

}