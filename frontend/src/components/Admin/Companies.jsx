import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import GetAllCompanies from '../Hooks/GetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompany } from '@/redux/companySlice'
import CreateCompany from './CreateCompany'

export default function Companies() {
  GetAllCompanies();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)


  useEffect(() => {
    dispatch(setSearchCompany(input));
  }, [input])
  return (
    <div>
      <Navbar />
      <div className='mx-4'>
        <div className='max-w-6xl mx-auto my-10 border p-4 rounded-xl shadow-xl'>
          <div className='flex items-center justify-between my-5'>
            <Input className="w-fit" onChange={(e) => setInput(e.target.value)} placeholder="Filter By Name" />
            <Button onClick={() => setOpen(true)} className="bg-[#ed3a08]">New Company</Button>
          </div>
          <CompaniesTable />
        </div>
        <CreateCompany open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}