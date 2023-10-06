import ProfileCard from "@/components/ui/ProfileCard";

export default function Profile(){
    return(
        <div className="w-full max-w-3xl flex flex-col gap-6 mx-auto mt-4 border-solid border-2 rounded-lg" >
        <div className=" mx-10 my-10">
            <h1 className="text-2xl font-bold text-center">Profile</h1>
            <ProfileCard></ProfileCard>
        </div>
  </div>
    )
    
}