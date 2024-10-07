import { setAllApliedJobs } from "@/redux/jobSlice";
import { APPLYJOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function GetAllUserAppliedJob() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLYJOB_API_END_POINT}/get`, { withCredentials: true })
                if (response.data.success) {
                    dispatch(setAllApliedJobs(response.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
}




