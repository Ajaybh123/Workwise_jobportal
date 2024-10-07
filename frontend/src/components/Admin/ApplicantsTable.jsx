import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, MoreHorizontal, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLYJOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const statusArray = ["Accepted", "Rejected"]

export default function ApplicantsTable() {
    const { applicants } = useSelector(state => state.applicant)

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const response = await axios.put(`${APPLYJOB_API_END_POINT}/status/${id}/update`, { status }, {
            })
            if (response.data.success) {
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399', // Red color
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
    return (
        <div>
            <Table className="text-center">
                <TableCaption className="font-bold">A list of total applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-black" >Full Name</TableHead>
                        <TableHead className="text-center text-black" >Email</TableHead>
                        <TableHead className="text-center text-black" >Contact</TableHead>
                        <TableHead className="text-center text-black" >Resume</TableHead>
                        <TableHead className="text-center text-black" >Date</TableHead>
                        <TableHead className="text-center text-black" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resumeOriginalName ? <a className='text-blue-600' href={item?.applicant?.profile?.resume} target="_blank" rel="noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-30 py-2 px-4">
                                            {
                                                statusArray.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex items-center gap-2 w-fit cursor-pointer mb-2'>
                                                            {
                                                                status === "Accepted" ? <Check className='w-4 text-green-700' /> : <X className='w-4 text-red-700' />
                                                            }
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}
