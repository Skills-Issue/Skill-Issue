import DefaultTable from "@/components/ui/TableRow";

export default function Jobs(){

    const joblist = [{title:"admin-assistant",expiry:"12/12/2021",status:"active",id:"1",description:"fun to do"},];



    return(
        <div>
            <h1>Active Listings</h1>
            <DefaultTable jobListings={joblist}/>
        </div>
    )
}