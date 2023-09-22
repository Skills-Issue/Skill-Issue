import DefaultTable from "@/components/ui/TableRow";

export default function Jobs(){

    const joblist = [];



    return(
        <div>
            <h1>Active Listings</h1>
            <DefaultTable jobListings={joblist}/>
        </div>
    )
}