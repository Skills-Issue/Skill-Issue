"use client"

import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { useRoleContext } from "./RoleContext";
import axios from 'axios';
import { DEFAULT_REDIRECTS } from "@/lib/hooks/constants";

export default function SignIn(){
  const router = useRouter()
  const { selectedRole, setSelectedRole } = useRoleContext();
  const [email, setEmail] = useState('')
  const [childData, setChildData] = useState(null);

  async function checkAccount(email){
    const url=`http://127.0.0.1:5000/staff/${email}`
    axios.get(url, {
  })
  .then(response=>{
    console.log(response.data.data.access_role_id)
      if(response.data.code=="200"){
        localStorage.setItem("Account",response.data.data.access_role_id)
        localStorage.setItem("user",JSON.stringify(response.data.data))
        if(response.data.data.access_role_id==4 || 1){
          setSelectedRole("Human Resources")
          router.push(DEFAULT_REDIRECTS.hrdashboard)
        }else{
          
          setSelectedRole("Staff")
          router.push(DEFAULT_REDIRECTS.staffdashboard)
        }
      } else {
        console.log("wrong acc")
        alert("Invalid Account")
      }
      
  })
  .catch(error =>{
      console.log(error.message);
  })
  }

  async function handleLogin() {
      await checkAccount(email)
  }

  function handleEmailChange(e){
    setEmail(e.target.value)
  }
  

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
          
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
            </div>
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {/* Here is the starting div for form */}
          <div className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-black hover:text-gray-600">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           
            <div>
              
              <button
                onClick={handleLogin}
                className="flex w-full justify-center bg-gray-900 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600"
              >
                Sign in
              </button>
              
            </div>

          {/* This is the div for form */}
          </div>
            </div>

        </div>
    )
}