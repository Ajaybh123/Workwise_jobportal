import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

export default function UpdateDailogProfile({ open, setOpen }) {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state.auth)
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        // skills: user?.profile?.skills || [],
        file: user?.profile?.resume || ""
    })

    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        // const { name, value } = e.target;

        // if (name === "skills") {
        //     setInput({ ...input, skills: value.split(',').map(skill => skill.trim()) });
        // } else {
        //     setInput({ ...input, [name]: value });
        // }
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const postData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true)
            const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399',
                    },
                });

            }
        } catch (error) {
            toast.error(error.response?.data?.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className="border-b-4 pb-4">
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={postData}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-left">Name :</Label>
                                <Input id="name" type="text" name="name" value={input.fullname} onChange={changeEventHandler} className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-left">Email :</Label>
                                <Input id="email" type="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-left">Phone No :</Label>
                                <Input id="number" type="text" name="number" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-left">Bio :</Label>
                                <Input id="bio" type="text" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-left">Skills :</Label>
                                <Input id="skills" tyep="text" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-left">Resume :</Label>
                                <Input id="file" name="file" type="file" onChange={changeFileHandler} className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                                    <Button type="submit" className="w-full my-4 bg-[#ed3a08]">Update Profile</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
