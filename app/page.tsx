"use client";
import React from "react";
import Landing from "./components/Landing/Landing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


function page() {
const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Landing />

      <h4 style={{ marginBottom: 16 }}>{count}</h4>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button
        onClick={() => dispatch(decrement())}
        style={{ marginInline: 16 }}
      >
        decrement
      </button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </div>
  );
}

export default page;
