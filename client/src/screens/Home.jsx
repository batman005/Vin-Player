import Buckets from '../components/Buckets/Buckets';
import { Box } from '@mui/system'
import { getBucketList } from '../models/actions/BucketListAction'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
    const dispatch = useDispatch();
    const BucketList = useSelector(state => state.getBucketList);

    useEffect(() => {
        dispatch(getBucketList());
        document.title = "Home";
    }, [])

    return (
        <div style={{backgroundColor:"black"}}>
            <Box sx={{ height: '100%', marginTop: "62px", backgroundColor: "#0f0f0f", color: "white" }}>
                {
                    BucketList?.BucketList?.map((list, index) => {
                        return <Buckets key={index} list={list} />
                    })
                }
            </Box>
        </div>

    )



}
