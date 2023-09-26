"use client"
import DefaultTable from "@/components/ui/TableRow"
import { useEffect, useState } from "react"


export default function hrDashboard(){
    const [listings, setListings] = useState([])
    useEffect(() => {
        const fetchListingData = async () => {
            const res = await fetch('http://127.0.0.1:5000/rolelisting')
            const data = await res.json()
            setListings(data.data.rolelistings)
        }
        fetchListingData()
    })

    return (
    <div>
        hr dashboard
        <h1></h1>
        <DefaultTable listings={listings}/>
    </div>
    )
}