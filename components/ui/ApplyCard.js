"use client";
import { useEffect,useState } from 'react';
import { Button, Label, Textarea, TextInput, Alert } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function ApplyCard(props) {
  const [msg,setMsg] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const Userdata = JSON.parse(localStorage.getItem("user"));
    const User_ID = Userdata.Staff_ID;
    console.log(User_ID);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDay();
    const formattedDate = year + "-" + month + "-" + day;

    const Application = { "User_ID": 0, "Application_Details": msg, "Applicant_ID": User_ID, "Application_Date": formattedDate};
    console.log(Application);
    setIsPending(true);

    await fetch("http://127.0.0.1:5000/jobs/apply/1", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(Application),
  }).then(() => {
    console.log("New application added");
    setIsPending(false);
    router.push("/staff/dashboard");

  })
  }


  return (
    <div className="flex justify-center items-center py-5">
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email Address" />
          </div>
          <TextInput
            addon="@"
            disabled
            helperText={
              <>
                Only the Hiring Manager and HR Department will be able to see
                your message. Please be courteous
              </>
            }
            id="email1"
            placeholder={props.email}
            required
            type="email"
          />
        </div>
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Your message to the Hiring Manager" />
        </div>
        <Textarea
          id="comment"
          placeholder="Leave a comment..."
          value={msg}
          required
          rows={4}
          onChange={(e) => setMsg(e.target.value)}
        />
        { !isPending && <Button type="submit" gradientDuoTone="tealToLime">
          Submit Application
        </Button>}
        { isPending && <Button type="submit" gradientDuoTone="tealToLime">
          Submitting Application...
          </Button>}
      </form>
    </div>
  );
}
