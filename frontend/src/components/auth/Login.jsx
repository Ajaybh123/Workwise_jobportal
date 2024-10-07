import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import authImage from '../../assets/login.gif'

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(state => state.auth)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const postData = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        navigate('/')
        toast.success(response.data.message, {
          style: {
            backgroundColor: '#34d399', // Red color
          },
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          backgroundColor: '#c53d3d',
        },
      })
    } finally {
      dispatch(setLoading(false))
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

      <div className='flex items-center justify-center bg-gray-100'>
        <form
          onSubmit={postData}
          className='border border-gray-200 rounded-md p-4 my-10 shadow-2xl bg-white mx-4 max-w-sm z-50 absolute top-40'
        >
          <h1 className='font-bold text-xl mb-5 text-center'>Log-In</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter Email"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter Password"
            />
          </div>

          <div className='flex items-center gap-4 my-4'>
            <div className="flex items-center space-x-2">
              <input type="radio" name="role" checked={input.role === "student"} onChange={changeEventHandler} value="student" className="cursor-pointer" />
              <Label htmlFor="option-one">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="role" checked={input.role === "recruiter"} onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </div>

          {
            loading ? (
              <Button className="w-full my-4">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-[#ed3a08]">Login</Button>
            )
          }
          <span>
            Already have an account?
            <Link className='text-[#ed3a08]' to="/signup">Signup</Link>
          </span>
        </form>
      </div>
    </div>

  )
}
