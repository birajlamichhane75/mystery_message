"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';

const NavBar = () => {

    const session = useSession();
    const user = session.data?.user;



    return (
        <nav className='w-full shadow-md bg-gray-200 border-2 px-20 py-5 '>
            <div className='w-full flex items-center justify-between '>
                <div className='flex items-center gap-5'>
                    <Link href="#"><h1 className='font-bold text-blue-950 text-2xl'>Mystery Message</h1></Link>
                    <div className='flex items-center gap-5 list-none'>
                        {
                            user &&
                            <>
                                <li><Link className='text-lg' href="/">Home</Link></li>
                                <li><Link className='text-lg' href="/dashboard">Dashboard</Link></li>
                            </>
                        }
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div>
                        {
                            user && <p>Welcome @{user?.username}</p>
                        }
                    </div>

                </div>

                <div>
                    {
                        user ? (
                            <button onClick={() => signOut()} className={`shadow-lg px-3 py-2 rounded-md text-white font-semibold bg-black`}>
                                Log Out
                            </button>) : (
                            <Link href="/sign-in" className={`shadow-lg px-3 py-2 rounded-md text-white font-semibold bg-black`}>
                                Log In
                            </Link>
                        )
                    }

                </div>
            </div>
        </nav>
    );
}

export default NavBar;