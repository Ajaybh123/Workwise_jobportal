import { Job } from '../models/jobModel.js'

export const register = async (req, res) => {
    try {
        const { title, description, requirments, salary, location, jobType, experiance, position, companyId } = req.body;

        const userId = req.id
        if (!title || !description || !requirments || !salary || !location || !jobType || !experiance || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const user = await Job.create({
            title,
            description,
            requirments,
            jobType,
            salary,
            location,
            experiance,
            position,
            company: companyId,
            created_by: userId

        });
        return res.status(201).json({
            message: "Job Created Successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs = await Job.find(query).populate(
            {
                path: "company",
                select: "name -_id logo"
            }
        )
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}

// for student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if (!job) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//for admin
export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1
        })
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}