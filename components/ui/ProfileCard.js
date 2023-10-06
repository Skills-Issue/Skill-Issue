"use client"
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export default function ProfileCard(){
    return (
    <form className="flex max-w-md flex-col gap-4 my-4 mx-auto">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Your email"
          />
        </div>
        <TextInput
          id="email1"
          placeholder="name@flowbite.com"
          required
          type="email"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Your password"
          />
        </div>
        <TextInput
          id="password1"
          required
          type="password"
        />
      </div>
      
      <Button type="submit">
        Submit
      </Button>
    </form>
    )
}