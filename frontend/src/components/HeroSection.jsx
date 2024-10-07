import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'
import { Typewriter } from 'react-simple-typewriter'
import '../App.css'

export default function HeroSection() {

  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchQueryHandler = () => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  return (
    <div className='text-center hero-section pt-10 sm:pt-16 lg:pt-20'>
      <span className='px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-gray-100 text-[#ed3a08] text-sm sm:text-base lg:text-lg'>
        No. 1 Job Hunt Website
      </span>

      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold my-4 sm:my-6 lg:my-8 text-black'>
        <span className='block sm:inline'>Build Your Career With</span>{' '}
        <span className='text-[#ed3a08]'>
          <Typewriter
            words={['Frontend Developer', 'Backend Developer', 'Data Analystic', 'Machine Learning']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>{' '}
        <span className='block sm:inline'>Role</span>
      </h1>


      <p className='text-sm sm:text-base lg:text-lg text-black mb-4 sm:mb-6 lg:mb-8 mx-4 lg:mx-44 md:block hidden'>
        Discover top job listings, filter results to match your preferences, and apply easily.
        Track applications and connect with employers through our intuitive platform. Start building your career today!
      </p>

      <div className='mx-4'>
        <div className='flex w-full sm:w-[70%] md:w-[50%] lg:w-[35%] items-center gap-2 p-2 sm:p-3 lg:p-4 mx-auto mt-10 sm:mt-16 lg:mt-20 shadow-lg rounded-full border text-black bg-white'>
          <Input
            type='text'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full bg-gray-100 rounded-full h-8 sm:h-10'
            placeholder='Search your dream job according to your Profession'
          />
          <Button onClick={searchQueryHandler} className='rounded-full h-8 sm:h-10'>
            <Search className='h-4 w-4 sm:h-5 sm:w-5' />
          </Button>
        </div>
      </div>
    </div>

  )
}
