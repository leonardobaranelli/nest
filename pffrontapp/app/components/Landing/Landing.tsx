import React from 'react'
import Link from 'next/link'

const Landing = () => {
    return (
        <div style={{transform:"translateY(400px) translateX(850px)"}}>
            <Link href="../../Views/home" style={{fontSize:"50px", textDecoration:"none", color:"black"}}>Home</Link>
        </div>
    )
}

export default Landing
