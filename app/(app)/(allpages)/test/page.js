"use client"
import ApplyCard from "@/components/ui/ApplyCard";
import { useEffect,useState } from 'react';


export default function test() {
    const user = localStorage.getItem("user");
    console.log(user);
    const Userdata = JSON.parse(user);
    let email = Userdata.Email;

    return (
        <div>
            Hello World
        <ApplyCard email={email}/>
        </div>
    )
    }
    