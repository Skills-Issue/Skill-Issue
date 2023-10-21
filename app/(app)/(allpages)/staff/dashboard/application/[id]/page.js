"use client"
import ApplyCard from "@/components/ui/ApplyCard";
import { useEffect,useState } from 'react';


export default function application(params) {
    console.log(params);
    const user = localStorage.getItem("user");
    console.log(user);
    const Userdata = JSON.parse(user);
    let email = Userdata.email;
    let roleId = params.params.id;

    return (
        <div>
        <ApplyCard props={[email,roleId]}/>
        </div>
    )
    }
    