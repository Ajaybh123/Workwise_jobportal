import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobs: "",
        allAppliedJobs: [],
        searchQuery: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobs: (state, action) => {
            state.searchJobs = action.payload
        },
        setAllApliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }

    }
})
export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobs, setAllApliedJobs, setSearchQuery } = jobSlice.actions
export default jobSlice.reducer