import express from 'express'
import { getAdminJob, getAllJobs, getJobById, register } from '../controllers/jobController.js'
import isAuthenticate from '../middleware/isAuthenticate.js'

const router = express.Router()

router.route("/create").post(isAuthenticate, register)
router.route("/get").get(isAuthenticate, getAllJobs)
router.route("/get/:id").get(isAuthenticate, getJobById)
router.route("/getadmin").get(isAuthenticate, getAdminJob)

export default router