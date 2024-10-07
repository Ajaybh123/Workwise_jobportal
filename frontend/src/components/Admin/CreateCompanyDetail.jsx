import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import GetSingleCompany from '../Hooks/GetSingleCompany'

export default function CreateCompanyDetail() {
    const [loading, setLoading] = useState(false);
    const param = useParams()
    const companyId = param.id
    GetSingleCompany(companyId)

    const navigate = useNavigate()
    const { singleCompany } = useSelector(state => state.company)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFilehandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const postData = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const response = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (response.data.success) {
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399', // Red color
                    },
                })
                navigate('/admin/companies')
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

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className='mx-4'>
                <div className='max-w-xl mx-auto my-10'>
                    <form onSubmit={postData} className='border border-gray-300py-4 shadow-xl rounded-md'>
                        <div className='flex items-center justify-between my-5 px-8'>
                            <h1 className='font-bold text-xl'>Company Details</h1>
                            <Button onClick={() => navigate('/admin/companies')} variant="outline" className="flex items-center gap-2 rounded-full ">
                                <ArrowLeft className='w-4' />
                                <span>Back</span>
                            </Button>
                        </div>
                        <hr className='h-0.5 bg-[#ed3a08]' />
                        <div className='grid grid-cols-2 gap-4 px-8 mt-5'>
                            <div className="mb-4">
                                <Label>Company Name</Label>
                                <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
                            </div>
                            <div className="mb-4">
                                <Label>Website Link</Label>
                                <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
                            </div>
                        </div>

                        <div className="mb-4 px-8">
                            <Label>Description</Label>
                            <Textarea type="text" className="h-20" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div className='grid grid-cols-2 gap-4 px-8'>
                            <div className="mb-4">
                                <Label>Location</Label>
                                <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
                            </div>
                            <div className="mb-4">
                                <Label>Logo</Label>
                                <Input type="file" name="file" onChange={changeFilehandler} />
                            </div>
                        </div>
                        <div className='px-8'>
                            {
                                loading ? <Button className="w-full my-4 "><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                                    <Button type="submit" accept="image/*" className="w-full my-4 bg-[#ed3a08] ">Update Detail</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
