import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import authImage from '../../assets/signup.gif'


export default function Signup() {

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    })

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const postData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)

        }
        try {
            setLoading(true)
            const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (response.data.success) {
                dispatch(setUser(response.data.user))
                navigate('/login')
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399',
                    },
                })
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div style={{
                backgroundImage: `url(${authImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
            }}>
            </div>
            <div className='flex items-center justify-center bg-[#f9dec7]'>
                <form onSubmit={postData} className='border border-gray-200 rounded-md p-4 my-10 shadow-2xl bg-white mx-4 max-w-sm z-50 absolute top-40'>
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign UP</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Enter Name" />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter Email" />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Enter Phone Number" />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter Password" />
                    </div>

                    <div className='flex gap-5 items-center my-3'>
                        <div className="flex items-center space-x-2">
                            <input type="radio" name="role" checked={input.role === "student"} onChange={changeEventHandler} value="student" className="cursor-pointer" />
                            <Label htmlFor="option-one">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="radio" name="role" checked={input.role === "recruiter"} onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
                            <Label htmlFor="option-two">Recruiter</Label>
                        </div>
                    </div>

                    <div>
                        <Label>Profile</Label>
                        <Input name="file" type="file" onChange={changeFileHandler} className="cursor-pointer" />
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                            <Button type="submit" className="w-full my-4 bg-[#ed3a08]">Sign-Up</Button>
                    }
                    <span>Already have an account?<Link className='text-[#ed3a08]' to="/login">Login</Link></span>
                </form>

            </div>
        </div>
    )
}
