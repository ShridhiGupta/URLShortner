import wrapAsync from "../utils/tryCatchWrapper.js"
import { getAllUserUrlsDao, deleteUserUrlDao } from "../dao/user.dao.js"

export const getAllUserUrls = wrapAsync(async (req, res) => {
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({message:"success",urls})
})

export const deleteUserUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    await deleteUserUrlDao(id, _id)
    res.status(200).json({message:"URL deleted successfully"})
})