import mongoose from "mongoose";

import { bucket_list } from "../../schemas/bucket_list.js";

const BucketList = new mongoose.model("BucketList", bucket_list);

const getBucketList = async (req, res) => {
    try {
        const bucketList = await BucketList.find({});
        return res.send(
            bucketList.filter(list => { return list.hidden === false })
        );
    } catch (error) {
        console.log(error);
    }
};

export default getBucketList;
