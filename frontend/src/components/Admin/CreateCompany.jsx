import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

export default function CreateCompany({ open, setOpen }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState();

    const createCompany = async () => {
        try {
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (response?.data?.success) {
                dispatch(setSingleCompany(response.data.company))
                const companyId = response?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399', // Red color
                    },
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        }
        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className="border-b-4 pb-4">
                        <DialogTitle className="text-[#ed3a08]">Your Company Name</DialogTitle>
                    </DialogHeader>
                    <Label>Company Name</Label>
                    <Input type="text" className=" w-full" onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Your Company Name" />
                    <DialogFooter>

                        <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                        <Button onClick={createCompany}>Continue</Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
