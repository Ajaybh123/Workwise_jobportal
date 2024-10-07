import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

export default function AppliedJobTable() {
  const { allAppliedJobs } = useSelector(state => state.job)
  return (
    <div className='mx-4'>
      {
        allAppliedJobs?.length <= 0 ?
          <div className='text-center mb-5'>
            <span>You have not applied any jobs yet.</span>
          </div>
          :
          <Table className="text-center border-y border-gray-400">
            <TableCaption className="font-bold pb-3 text-sm">A list of your all jobs that you have applied.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-black">Date</TableHead>
                <TableHead className="text-center text-black">Job Role</TableHead>
                <TableHead className="text-center text-black">Company</TableHead>
                <TableHead className="text-center text-black">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                allAppliedJobs?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{item.job?.title}</TableCell>
                    <TableCell>{item.job?.company?.name}</TableCell>
                    <TableCell><Badge className={`rounded-full capitalize ${item.status === "rejected" ? "bg-red-600" : item.status === "accepted" ? "bg-green-600" : "bg-yellow-600"}`}>{item.status}</Badge></TableCell>
                  </TableRow>
                ))
              }

            </TableBody>
          </Table>
      }
    </div>
  )
}
