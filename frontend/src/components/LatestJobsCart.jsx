import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

export default function LatestJobsCart({ job }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/job/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description.slice(0, 150)}.....</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-500'} variant='ghost'>{job?.position} positon</Badge>
        <Badge className={'text-green-500'} variant='ghost'>{job?.jobType}</Badge>
        <Badge className={'text-red-500'} variant='ghost'>{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}
