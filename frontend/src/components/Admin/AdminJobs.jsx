import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobTable from './AdminJobTable'
import GetAllAdminJobs from '../Hooks/GetAllAdminJobs'
import { setSearchJobs } from '@/redux/jobSlice'

export default function AdminJobs() {
  GetAllAdminJobs();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  useEffect(() => {
    dispatch(setSearchJobs(input));
  }, [input])
  return (
    <div>
      <Navbar />
      <div className='mx-4'>
        <div className='max-w-6xl mx-auto my-10 border p-4 rounded-xl shadow-xl'>
          <div className='flex items-center justify-between my-5'>
            <Input className="w-fit" onChange={(e) => setInput(e.target.value)} placeholder="Filter By Name" />
            <Button onClick={() => navigate('/admin/jobs/create')} className="bg-[#ed3a08]">Create Job</Button>
          </div>
          <AdminJobTable />
        </div>
      </div>
    </div>
  )
}
