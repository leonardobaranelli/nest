"use client";

import React from "react";
import Landing from "./components/Landing/Landing";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
require("dotenv").config();

function page( { session }:{session:Session}) {
  return (
    <div>
      <SessionProvider session={session}>
        <Landing />
      </SessionProvider>
    </div>
  );
}

export default page;
