import { Application } from '../models/applicationModel.js'
import { Job } from '../models/jobModel.js'

export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }

        const existApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existApplication) {
            return res.status(400).json({
                message: "You have already applyed for this Job",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplicant = await Application.create({
            job: jobId,
            applicant: userId,
        })
        job.applications.push(newApplicant._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully!",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!application) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(201).json({
            message: "Job applied successfully!",
            application,
            success: true
        })
    } catch (error) {

    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Application.find({ job: jobId }).populate({
            path: 'job',
        })
            .populate({
                path: 'applicant',
            })
            .sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(201).json({
            message: "Job applied successfully!",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicaitonId = req.params.id
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicaitonId })
        if (!application) {
            return res.status(404).json({
                message: "application not found",
                success: false
            })
        }

        application.status = status.toLowerCase();
        await application.save()

        return res.status(201).json({
            message: "Status Updated successfully!",
            application,
            success: true
        })
    } catch (error) {

    }
}