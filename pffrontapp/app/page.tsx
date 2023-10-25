"use client";

import React from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment, reset } from "@/redux/features/counterSlice";

function page() {
const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  return (
 
            <div>
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
  )
}

export default page