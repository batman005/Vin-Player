import History from '../components/History/History'
import { Box } from '@mui/system';
import { useEffect } from 'react';


export default function HistoryTab() {
    useEffect(() => {
        document.title = "History";
    }, [])
    return (
        <div>
            <Box sx={{ marginTop: "62px" }} >
                <History />
            </Box>
        </div>
    )
}