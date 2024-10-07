import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function GetAllJobs() {
    const dispatch = useDispatch()
    const { searchQuery } = useSelector(state => state.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, { withCredentials: true })
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}
