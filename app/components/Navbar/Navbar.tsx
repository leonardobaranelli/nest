import React from 'react'
import Search from '../Search/SearchBar'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div style={{display:'flex', justifyContent:"space-around", alignItems:"center", background:"#ffefeb"}}>
            <h2>Logo</h2>
            <div>
                <Search/>
            </div>
            <ul style={{display:'flex', justifyContent:"space-around", listStyle:"none", gap:"50px"}}>
                <li><Link href="../../Views/Buy">Buy</Link></li>
                <li><Link href="../../Views/Rent">Rent</Link></li>
                <li>Publicar inmueble</li>
            </ul>
        </div>
    )
}

export default Navbar