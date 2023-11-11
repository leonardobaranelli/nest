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
                <div>
                    <div className='flex'>
                        <div>
                            <p>Nombre</p>
                            <p>Rol</p>
                        </div>
                        <div>
                            <p>Avatar</p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header