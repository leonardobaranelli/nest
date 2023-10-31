"use client";

import React from 'react'
import Home from './Views/home/page';
import Landing from './components/Landing/Landing';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


function page() {


  return (
    <div>
      <Landing />


    </div>
  );
}

export default page