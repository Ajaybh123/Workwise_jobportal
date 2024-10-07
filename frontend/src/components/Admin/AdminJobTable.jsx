import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AdminJobTable() {
    const navigate = useNavigate()
    const { allAdminJobs, searchJobs } = useSelector(state => state.job)
    const [filterJob, setFilterJob] = useState(allAdminJobs)

    useEffect(() => {
        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobs) {
                return true
            };
            return job?.company.name?.toLowerCase().includes(searchJobs.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobs.toLowerCase())
        });
        setFilterJob(filteredJob)
    }, [allAdminJobs, searchJobs])

    return (
        <div>
            <Table className="text-center">
                <TableCaption className="font-bold">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-black" >Company Name</TableHead>
                        <TableHead className="text-center text-black" >Role</TableHead>
                        <TableHead className="text-center text-black" >Date</TableHead>
                        <TableHead className="text-center text-black" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob.length <= 0 ? <span>You havn't not registered any company yet.</span> :
                            <>
                                {
                                    filterJob.map((job) => (
                                        <tr>

                                            <TableCell>{job?.company.name}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                            <TableCell>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className="w-30 py-2 px-4">
                                                        <div onClick={() => navigate(`/admin/job/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer mb-2'>
                                                            <Edit2 className='w-4 text-blue-700' />
                                                            <span>Edit</span>
                                                        </div>
                                                        <div onClick={() => navigate(`/admin/job/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer mb-2'>
                                                            <Eye className='w-4 text-blue-700' />
                                                            <span>Applicants</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>
                                    ))
                                }
                            </>
                    }

                </TableBody>
            </Table>
        </div>
    )
}
