import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateDailogProfile from './UpdateDailogProfile'
import { useSelector } from 'react-redux'
import GetAllUserAppliedJob from './Hooks/GetAllUserAppliedJob'

export default function Profile() {
  GetAllUserAppliedJob();
  const isResume = true;
  const [open, setOpen] = useState(false)
  const { user } = useSelector(state => state.auth)

  return (
    <div>
      <Navbar />
      <div className='mx-4'>
        <div className='max-w-7xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl my-5 p-4 sm:p-8'>
          <Button onClick={() => setOpen(true)} className="mt-4 sm:mt-0 rounded-full float-end p-1.5 shadow-lg" title="edit" variant="outline"><Pen className='h-4' /></Button>

          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile pic" />
              </Avatar>
              <div className='text-center sm:text-left'>
                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </div>
          </div>

          <div className='my-4'>
            <div className='flex gap-4 items-center my-3'>
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className='flex gap-4 items-center my-3'>
              <Contact />
              <span>+91 {user?.phoneNumber}</span>
            </div>
          </div>

          <div className='my-4'>
            <h1 className="text-md font-bold">Skills</h1>
            <div className='flex flex-wrap items-center gap-2 mt-2'>
              {
                user?.profile?.skills?.length ?
                  user?.profile?.skills?.map((item, index) => (
                    <Badge key={index} className='rounded-full px-2 py-1'>{item}</Badge>
                  )) : <span>NA</span>
              }
            </div>
          </div>

          <div className='flex flex-col'>
            <Label className="text-md font-bold">Resume</Label>
            {
              isResume ? <a target='_blank' href={user?.profile?.resume} className='text-blue-400'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
          </div>
        </div>

        <div className='max-w-7xl mx-auto bg-gray-50 rounded-2xl my-5 border'>
          <h1 className='font-bold text-lg p-5'>Applied Jobs</h1>
          <AppliedJobTable />
        </div>

        <UpdateDailogProfile open={open} setOpen={setOpen} />
      </div>
    </div>

  )
}
