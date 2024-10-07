import { setAllCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function GetAllCompanies() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCopanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true })
                if (response.data.success) {
                    dispatch(setAllCompanies(response.data.companies))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCopanies();
    }, [])
}
