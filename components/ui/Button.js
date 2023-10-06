'use client'

import React from "react";

import { Button } from 'flowbite-react';
import Link from 'next/link';

import AddIcon from '../../public/addIcon.png';

export default function Outline({ caption}) {

    return (
        <Button gradientDuoTone="tealToLime">
          {caption}
        </Button>
        )
  }