'use client'

import React from "react";

import { Button } from 'flowbite-react';
import Link from 'next/link';

import AddIcon from '../../public/addIcon.png';


export default function Outline() {

    return (
      <>
      <Link href="/hr/create">
        <Button gradientDuoTone="tealToLime">
            {/* <img src = {AddIcon}></img> */}
          Create New Role
        </Button>
        </Link>
        </>
        )
  }