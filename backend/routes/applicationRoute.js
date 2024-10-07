import express from "express"
import { applyJob, getApplicants, getAppliedJob, updateStatus } from '../controllers/applicationController.js'
import isAuthenticate from "../middleware/isAuthenticate.js"

const router = express.Router()

router.route("/apply/:id").get(isAuthenticate, applyJob)
router.route("/get").get(isAuthenticate, getAppliedJob)
router.route("/:id/applicants").get(isAuthenticate, getApplicants)
router.route("/status/:id/update").put(isAuthenticate, updateStatus)

export default router