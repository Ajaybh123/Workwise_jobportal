import React from 'react'
import LatestJobsCart from './LatestJobsCart';
import { useSelector } from 'react-redux';

// const randomJobs = [1,2,3,4,5,6,7,8];
export default function LatestJob() {
  const { allJobs } = useSelector(state => state.job)
  return (
    <div className='max-w-7xl mx-auto my-10 px-4'>
      <h1 className='text-2xl sm:text-3xl font-bold'>
        <span className='text-[#ed3a08]'>Latest</span> & <span className='text-[#ed3a08]'>Top</span> Jobs Opening
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
        {
          allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs.slice(0, 6).map((job) => (
              <LatestJobsCart key={job?._id} job={job} />
            ))
          )
        }
      </div>
    </div>

  )
}
