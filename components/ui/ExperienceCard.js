"use client"
import { useState,useEffect } from "react"

export default function ExperienceCard(){
    const [data, setData] = useState(null)
    const User = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/staffskill/${User.staff_id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if(data.code==404){
              setData(null)
            }else{
              setData(data.data.staff_skills);
            }

          })
      }, []);


        var skillsArray = null;
        if(data!= null){
          var skillsArray = Object.values(data);
        }
    
    return (
        <div>
            
      <span >Skills </span>
      <hr className="mb-2"></hr>
      {skillsArray?.length ? (
  skillsArray.map((skill, index) => (
    <span key={index} className="mb-2 text-2xl">
      <span className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        {skill.skill_name}
      </span>
    </span>
  ))
) : (
  <span className="text-sm">No skills available</span>
)}

      </div>
    )

}