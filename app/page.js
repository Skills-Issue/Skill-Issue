"use client"
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { DEFAULT_REDIRECTS } from "@/lib/hooks/constants";

export default function Home() {
  useEffect(() => {
    // Redirect logic here
    redirect(DEFAULT_REDIRECTS.login);
  }, []);

  return null;
}