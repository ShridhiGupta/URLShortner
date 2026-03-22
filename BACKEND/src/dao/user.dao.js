import User from "../models/user.model.js"
import UrlModel from "../models/short_url.model.js"

export const findUserByEmail = async (email) => {
    return await User.findOne({email})
}

export const findUserByEmailByPassword = async (email) => {
    return await User.findOne({email}).select('+password')
}

export const findUserById = async (id) => {
    return await User.findById(id)
}

export const createUser = async (name, email, password) => {
    const newUser = new User({name, email, password})
    await newUser.save()
    return newUser
}

export const getAllUserUrlsDao = async (id) => {
    return await UrlModel.find({user:id})
}

export const deleteUserUrlDao = async (urlId, userId) => {
    const result = await UrlModel.deleteOne({ _id: urlId, user: userId })
    if (result.deletedCount === 0) {
        throw new Error("URL not found or you don't have permission to delete it")
    }
    return result
}