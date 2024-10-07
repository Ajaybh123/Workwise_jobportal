import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CompaniesTable() {
    const navigate = useNavigate()
    const { allCompanies, searchCompany } = useSelector(state => state.company)
    const [filterCompany, setFilterCompany] = useState(allCompanies)

    useEffect(() => {
        const filteredCompany = allCompanies.length >= 0 && allCompanies.filter((company) => {
            if (!searchCompany) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompany.toLowerCase())
        });
        setFilterCompany(filteredCompany)
    }, [allCompanies, searchCompany])

    return (
        <div>
            <Table className="text-center">
                <TableCaption className="font-bold">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-black" >Logo</TableHead>
                        <TableHead className="text-center text-black" >Name</TableHead>
                        <TableHead className="text-center text-black" >Date</TableHead>
                        <TableHead className="text-center text-black" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length <= 0 ? <span>You havn't not registered any company yet.</span> :
                            <>
                                {
                                    filterCompany.map((company) => (
                                        <tr>
                                            <TableCell className="flex justify-center items-center" >
                                                <Avatar>
                                                    <AvatarImage src={company.logo} />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                            <TableCell>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className="w-30 py-2 px-4">
                                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                            <Edit2 className='w-4 text-blue-700' />
                                                            <span>Edit</span>
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
