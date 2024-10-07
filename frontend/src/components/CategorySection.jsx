import React from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'
import '../App.css'
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "FullStack Developer",
  "FullStack Developer",
  "FullStack Developer"
]

export default function CategorySection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchQueryHandler = (query) => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  return (
    <div className="w-full lg:max-w-7xl md:max-w-2xl sm:max-w-lg mx-auto my-10">
      <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 '>
        <span className='text-[#ed3a08]'>List</span> Of Keyword
      </h1>

      <div className='scroll flex overflow-x-auto scrollbar-hide gap-4 mx-4 sm:mx-0'>
        {
          category.map((item, index) => {
            return (
              <div key={index} className="flex-shrink-0">
                <Button
                  onClick={() => searchQueryHandler(item)}
                  className="rounded-full p-4 sm:p-6 mb-8"
                >
                  {item}
                </Button>
              </div>
            );
          })
        }
      </div>
    </div>

  )
}
