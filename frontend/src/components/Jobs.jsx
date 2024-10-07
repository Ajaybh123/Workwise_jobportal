import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { ArrowBigDown, ArrowBigDownDash } from 'lucide-react'

// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

export default function Jobs() {
    const { allJobs, searchQuery } = useSelector(state => state.job)
    const [isOpen, setIsOpen] = useState(false);

    const [filterJob, setFilterJob] = useState(allJobs)

    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilterJob(filteredJobs)
        } else {
            setFilterJob(allJobs)
        }

    }, [allJobs, searchQuery])

    return (
        <div>
            <Navbar />
            <div className='mx-4 mt-10'>
                <div className='max-w-7xl mx-auto mt-5'>
                    <div className='md:hidden'>
                        <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none mb-3 bg-orange-600 p-2 w-full rounded-md flex items-center justify-between'>
                            <span className='font-bold'>Fiter By Category</span>
                            <ArrowBigDownDash />
                        </button>
                    </div>
                    <div className='flex gap-5'>
                        <div className={`${isOpen ? 'block z-10 absolute top-36 w-[100%] left-0 p-5' : 'hidden'} md:w-[20%] md:block lg:block`}>
                            <FilterCard />
                        </div>
                        {
                            filterJob.length <= 0 ? <span className='font-bold text-2xl'>Jobs Not Found!</span> :
                                <div className='flex-1 h-[88vh] overflow-y-auto jobs pb-5'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                        {
                                            filterJob.map((job) => (
                                                <motion.div
                                                    key={job?._id}
                                                    initial={{ opacity: 0, y: 100 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -100 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}
