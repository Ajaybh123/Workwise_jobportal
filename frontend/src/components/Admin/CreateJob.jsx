import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function CreateCompanyDetail() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const { allCompanies } = useSelector(state => state.company)


    const [input, setInput] = useState({
        title: "",
        description: "",
        requirments: "",
        salary: "",
        jobType: "",
        experiance: "",
        location: "",
        position: 0,
        companyId: "",
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeSelectHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value)
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const postData = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.post(`${JOB_API_END_POINT}/create`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (response.data.success) {
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399', // Red color
                    },
                })
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        } finally {
            setLoading(false)
        }
    }



    return (
        <div>
            <Navbar />
            <div className='mx-4'>
                <div className='max-w-xl mx-auto my-10'>
                    <form onSubmit={postData} className='border border-gray-300 py-4 shadow-xl rounded-md'>
                        <div className='flex items-center justify-between pb-5 px-8'>
                            <h1 className='font-bold text-xl'>Job Details</h1>
                            <Button onClick={() => navigate('/admin/jobs')} variant="outline" className="flex items-center gap-2 rounded-full ">
                                <ArrowLeft className='w-4' />
                                <span>Back</span>
                            </Button>
                        </div>
                        <hr className='h-0.5 bg-[#ed3a08]' />
                        <div className='grid grid-cols-2 px-8 gap-4 mt-5'>
                            <div className="mb-4">
                                <Label>Title</Label>
                                <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
                            </div>
                            <div className="mb-4">
                                <Label>Requirments</Label>
                                <Input type="text" name="requirments" value={input.requirments} onChange={changeEventHandler} />
                            </div>
                        </div>

                        <div className="mb-4 mx-8">
                            <Label>Description</Label>
                            <Textarea type="text" className="h-20" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div className='grid grid-cols-2 px-8 gap-4'>

                            <div className="mb-4">
                                <Label>Job Type</Label>
                                <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
                            </div>
                            <div className="mb-4">
                                <Label>Salary</Label>
                                <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 px-8 gap-4'>
                            <div className="mb-4">
                                <Label>Company Name</Label>
                                {
                                    allCompanies.length > 0 && (
                                        <Select onValueChange={changeSelectHandler}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selcet Company Name" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    allCompanies?.map((company) => {
                                                        return (
                                                            <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectContent>
                                        </Select>
                                    )
                                }
                            </div>
                            <div className="mb-4">
                                <Label>Location</Label>
                                <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 px-8 gap-4'>
                            <div className="mb-4">
                                <Label>Experiance Level</Label>
                                <Input type="text" name="experiance" value={input.experiance} onChange={changeEventHandler} />
                            </div>
                            <div className="mb-4">
                                <Label>Number Of Position</Label>
                                <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
                            </div>
                        </div>
                        <div className='px-8'>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                                    <Button type="submit" accept="image/*" className=" w-full my-4 bg-[#ed3a08]">Create Job</Button>
                            }
                        </div>
                        {
                            allCompanies.length === 0 && <p className='text-red-600 text-center font-bold text-sm'>*Please register a company first, before postiong a jobs</p>
                        }
                    </form>

                </div>
            </div>
        </div>
    )
}
