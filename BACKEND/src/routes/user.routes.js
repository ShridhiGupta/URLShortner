import express from "express"
import { getAllUserUrls, deleteUserUrl } from "../controller/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/urls",authMiddleware, getAllUserUrls)
router.delete("/url/:id", authMiddleware, deleteUserUrl)

export default router