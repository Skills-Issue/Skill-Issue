import ProfileCard from "@/components/ui/ProfileCard";
import ExperienceCard from "@/components/ui/ExperienceCard";

export default function Profile() {
  return (
    <div>
      <div className="w-full max-w-3xl flex flex-col gap-6 mx-auto mt-4 border-solid border rounded-lg">
        <div className=" mx-10 my-10">
          <ProfileCard></ProfileCard>
        </div>
      </div>
      <div className="w-full max-w-3xl flex flex-col gap-6 mx-auto mt-4 border-solid border rounded-lg">
        <div className=" mx-10 my-10">
          
          <ExperienceCard/>
        </div>
      </div>
    </div>
  );
}
