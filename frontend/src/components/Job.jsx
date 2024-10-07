import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

export default function Job({ job }) {
    const navigate = useNavigate()
    const daysAgoCalculate = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const TimeDeffer = currentDate - createdAt
        return Math.floor(TimeDeffer / (1000 * 24 * 60 * 60));
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 '>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-400'>
                    {daysAgoCalculate(job?.createdAt) === 0 ? "Today" : `${daysAgoCalculate(job?.createdAt)} days ago`}
                </p>
                <Button variant='outline' className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-3'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg sm:text-xl'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg sm:text-xl my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description.slice(0, 100)}.....</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-500'} variant='ghost'>{job?.position} position</Badge>
                <Badge className={'text-green-500'} variant='ghost'>{job?.jobType}</Badge>
                <Badge className={'text-red-500'} variant='ghost'>{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/job/description/${job?._id}`)} className="rounded-full" variant="outline">
                    Details
                </Button>
                <Button className="rounded-full bg-[#f1623a]">Save For Later</Button>
            </div>
        </div>
    )
}
