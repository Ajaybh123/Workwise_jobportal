import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLYJOB_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

export default function JobDetails() {
    const { user } = useSelector(state => state.auth)
    const { singleJob } = useSelector(state => state.job)
    const param = useParams();
    const jobId = param.id;
    const dispatch = useDispatch();
    const initialAppled = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApply, setIsApply] = useState(initialAppled)

    const jobApply = async () => {
        try {
            const response = await axios.get(`${APPLYJOB_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (response.data.success) {
                setIsApply(true)
                const updateSingleJobs = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJobs))
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
        }
    }

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job))
                    setIsApply(response.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJobs()

    }, [jobId, dispatch, user?._id])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto  bg-gray-50 border border-gray-200 rounded-2xl shadow-lg my-10 p-8'>
                <div className='flex item-center justify-between'>
                    <div>
                        <h1 className='font-bold text-lg my-2'>Frontend Developer</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className={'text-blue-500'} variant='ghost'>{singleJob?.position} positon</Badge>
                            <Badge className={'text-green-500'} variant='ghost'>{singleJob?.jobType}</Badge>
                            <Badge className={'text-red-500'} variant='ghost'>{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button onClick={jobApply} disabled={isApply} className={`rounded-lg ${isApply ? "cursor-not-allowed" : "bg-[#ed3a08] hover:bg-[#ed3a08] hover:shadow-orange-900"}`}>{isApply ? "Already Applied" : "Apply Now"}</Button>
                </div>
                <h1 className='border-b-2 font-medium py-4'>Job Description</h1>
                <div className='my-2'>
                    <h1 className='font-bold my-1'>Role:<span className='pl-4 font-medium text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Requirment:<span className='pl-4 font-medium text-gray-800'>{singleJob?.requirments}</span></h1>
                    <h1 className='font-bold my-1'>Location:<span className='pl-4 font-medium text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description:<span className='pl-4 font-medium text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experiance:<span className='pl-4 font-medium text-gray-800'>{singleJob?.experiance === "Fresher" ? singleJob?.experiance : singleJob?.experiance + "year"}</span></h1>
                    <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-medium text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-medium text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Post Date:<span className='pl-4 font-medium text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}
