import mongoose from 'mongoose'

import { bucket_list } from "../../schemas/bucket_list.js";

const BucketList = new mongoose.model("BucketList", bucket_list);

const addNewBucket = async (req, res) => {
    // Geting values from forntend
    const { bucketName } = req.body;

    try {
        const bucketList = await BucketList.findOne({ bucketName: bucketName })
        if (bucketList) {
            if (bucketList.bucketName === bucketName) {
                return res.send({
                    message: "Bucket Name Already Exist",
                    error: true,
                })
            }
        } else {
            const bucketList = new BucketList({
                bucketName: bucketName
            })
            // Saving customer on DB(back-End)
            await bucketList.save()
            return res.send({
                message: "New Bucket Created Succesfully",
                error: false,
            })
        }
    } catch (error) {
        console.log(error)
    }

}

export default addNewBucket;