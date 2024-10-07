import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Cross, LogOut, MenuIcon, User2, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

export default function Navbar() {
    // const user = false;
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutUser = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (response.data.success) {
                dispatch(setUser(null));
                navigate("/login")
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399',
                    },
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        }
    }
    return (
        <div className='bg-white sticky top-0 w-full z-50'>
            <div className='flex items-center justify-between mx-auto px-4 md:px-32 h-16 py-10 bg-gray-100'>
                <div>
                    <h1 className='text-2xl font-bold'>Work<span className='text-[#ed3a08]'>Wise</span></h1>
                </div>

                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none'>
                        <MenuIcon />
                    </button>
                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} md:flex items-center gap-12`}>
                    {
                        isOpen === true ?
                            <>
                                <div className={`fixed top-0 right-0 h-full bg-gray-100 w-64 p-5 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-[1000ms] ease-in-out`}>
                                    <ul className='flex flex-col font-medium items-start gap-5'>
                                        <div className='md:hidden'>
                                            <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none'>
                                                <X />
                                            </button>
                                        </div>

                                        {
                                            !user ? " " : (
                                                <>
                                                    <div className='flex gap-2'>
                                                        <Avatar>
                                                            <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                                                        </Avatar>
                                                        <div>
                                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                                            <p className='font-light text-sm'>{user?.profile?.bio}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col text-gray-500 mt-3'>
                                                        {
                                                            user && user.role === "recruiter" ? " "
                                                                :
                                                                <>
                                                                    <div className='flex w-fit items-center cursor-pointer'>
                                                                        <span className='hover:text-[#ed3a08] font-medium text-gray-900'><Link to="/profile">View Profile</Link></span>
                                                                    </div>
                                                                </>
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }

                                        {
                                            user && user.role === "recruiter" ?
                                                <>
                                                    <li className='hover:text-[#ed3a08]'><Link to="/">Companies</Link></li>
                                                    <li className='hover:text-[#ed3a08]'><Link to="/admin/jobs">Jobs</Link></li>
                                                </> :
                                                <>
                                                    <li className='hover:text-[#ed3a08]'><Link to="/">Home</Link></li>
                                                    <li className='hover:text-[#ed3a08]'><Link to="/jobs">Jobs</Link></li>
                                                    <li className='hover:text-[#ed3a08]'><Link to="/browse">Browse</Link></li>
                                                </>
                                        }
                                    </ul>
                                    {
                                        !user ? (
                                            <div className='flex items-center gap-2'>
                                                <Link to="/login"><Button className="rounded-full hover:bg-[#ed3a08] hover:text-white shadow-gray-400">Login</Button></Link>
                                                <Link to="/signup"><Button className="rounded-full bg-[#ed3a08] hover:bg-[#000] hover:text-white shadow-gray-400">SignUp</Button></Link>
                                            </div>
                                        ) : (

                                            <>
                                                <div className='flex flex-col text-gray-500 mt-3'>
                                                    {
                                                        user && user.role === "recruiter" ?
                                                            <div className='flex w-fit items-center cursor-pointer'>
                                                                <span onClick={logoutUser} variant="link">Logout</span>
                                                            </div> :
                                                            <>
                                                                <div className='flex w-fit items-center cursor-pointer gap-2 mt-2 hover:text-red-600'>
                                                                    <LogOut className='h-5' />
                                                                    <span onClick={logoutUser}>Logout</span>
                                                                </div>
                                                            </>
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                            :
                            <>
                                <ul className='flex font-medium items-center gap-5'>
                                    {
                                        user && user.role === "recruiter" ?
                                            <>
                                                <li className='hover:text-[#ed3a08]'><Link to="/">Companies</Link></li>
                                                <li className='hover:text-[#ed3a08]'><Link to="/admin/jobs">Jobs</Link></li>
                                            </> :
                                            <>
                                                <li className='hover:text-[#ed3a08]'><Link to="/">Home</Link></li>
                                                <li className='hover:text-[#ed3a08]'><Link to="/jobs">Jobs</Link></li>
                                                <li className='hover:text-[#ed3a08]'><Link to="/browse">Browse</Link></li>
                                            </>
                                    }
                                </ul>
                                {
                                    !user ? (
                                        <div className='flex items-center gap-2'>
                                            <Link to="/login"><Button className="rounded-full hover:bg-[#ed3a08] hover:text-white shadow-gray-400">Login</Button></Link>
                                            <Link to="/signup"><Button className="rounded-full bg-[#ed3a08] hover:bg-[#000] hover:text-white shadow-gray-400">SignUp</Button></Link>
                                        </div>
                                    ) : (
                                        <Popover>
                                            <PopoverTrigger>
                                                <Avatar>
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                                                </Avatar>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-60">
                                                <div className='flex gap-2'>
                                                    <Avatar>
                                                        <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                                                    </Avatar>
                                                    <div>
                                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                                        <p className='font-light text-sm'>{user?.profile?.bio}</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col text-gray-500 mt-3'>
                                                    {
                                                        user && user.role === "recruiter" ?
                                                            <div className='flex w-fit items-center cursor-pointer'>
                                                                <LogOut className='h-5' />
                                                                <Button onClick={logoutUser} variant="link">Logout</Button>
                                                            </div> :
                                                            <>
                                                                <div className='flex w-fit items-center cursor-pointer'>
                                                                    <User2 className='h-5' />
                                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                                </div>
                                                                <div className='flex w-fit items-center cursor-pointer'>
                                                                    <LogOut className='h-5' />
                                                                    <Button onClick={logoutUser} variant="link">Logout</Button>
                                                                </div>
                                                            </>
                                                    }
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </div>

    )
}
