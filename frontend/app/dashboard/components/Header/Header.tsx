import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <nav className='p-4 flex justify-between'>
                <div>
                    <Link
                        className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                        href="../../Views/home">
                        Home
                    </Link>
                </div>
                <div className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent">
                    <p>Panel de Administrador</p>
                </div>
            </nav>
        </>
    )
}

export default Header