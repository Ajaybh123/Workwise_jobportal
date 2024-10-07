import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import GetAllJobs from './Hooks/GetAllJobs'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


export default function Browse() {
    GetAllJobs();
    const { allJobs } = useSelector(state => state.job)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""))
        }
    })
    return (
        <div>
            <Navbar />
            <div className='mx-4'>
                <div className='max-w-7xl mx-auto my-10 '>
                    <h1 className='font-bold text-lg md:text-2xl my-4'>
                        Search Result ({allJobs.length})
                    </h1>
                    {
                        allJobs.length === 0 ?
                            <div className='flex flex-col items-center justify-center '>
                                <p className='text-2xl mt-10'>Jobs are not available with this keyword!</p>
                                <Button onClick={() => navigate('/')} className="bg-[#ed3a08] mt-4">
                                    Back To Home
                                </Button>
                            </div>
                            :
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {
                                    allJobs.map((item, index) => (
                                        <motion.div
                                            key={index} // Moved the key here to avoid warning in the console
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -100 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Job job={item} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </div>

    )
}
