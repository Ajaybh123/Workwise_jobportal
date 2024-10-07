import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLYJOB_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

export default function AdminApplicants() {
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(state => state.applicant)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLYJOB_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })

                if (response.data.success) {
                    dispatch(setAllApplicants(response.data.job))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [])
    return (
        <div>
            <Navbar />
            <div className='mx-4'>
                <div className='max-w-7xl mx-auto border p-4 rounded-xl shadow-xl my-6'>
                    <h1 className='font-bold text-xl mb-5'>Applicants ({applicants?.length})</h1>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}
