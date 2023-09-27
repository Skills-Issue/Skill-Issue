"use client"
import DefaultTable from "@/components/ui/TableRow"
import { useEffect, useState } from "react"

// ignore this for now it's just a button to go to create role listing page
import Outline from '@/components/ui/Button'


export default function hrDashboard(){
    const [listings, setListings] = useState([])
    const [waiting,setWaiting] = useState(false)
    useEffect(() => {
        const fetchListingData = async () => {
            setWaiting(true);
            const res = await fetch('http://127.0.0.1:5000/rolelisting')
            const data = await res.json()
            setListings(data.data.rolelistings)
            setWaiting(false);
        }
        fetchListingData()
    },[])

    return (
      <div>
        {/* <Outline/> */}
        <h1>hr dashboard</h1>

        {waiting?<h1>Fetching roles....</h1>:<DefaultTable listings={listings} />}
      </div>
    );
}