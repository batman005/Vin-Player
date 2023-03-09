import mongoose from 'mongoose'

import { bucket_list } from "../../schemas/bucket_list.js";

const BucketList = new mongoose.model("BucketList", bucket_list);

const updateBucketName = async (req, res) => {
    const { updateBucketNameFormValues } = req.body;

    BucketList.findByIdAndUpdate(
        { _id: updateBucketNameFormValues.bucket_id },
        {
            $set: {
                bucketName: updateBucketNameFormValues.bucketName,
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Bucket Name Updated Successfully",
                        error: false
                    })
                }
            }
        }
    )

}

export default updateBucketName;