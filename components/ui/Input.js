import React from "react";

function CustomInput() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <input type="email" placeholder="Email" />
      <input type="email" placeholder="Enter your email" />
    </div>
  );
}

export default CustomInput;