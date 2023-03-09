import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryList } from '../../models/actions/HistoryAction'
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Grid, Link, Typography } from '@mui/material';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

const History = () => {

    const dispatch = useDispatch();
    const HistoryList = useSelector(state => state.getHistoryList)

    useEffect(() => {
        dispatch(getHistoryList());
    }, [])

    return (
        <>
            <Container maxWidth="xl" style={{ backgroundColor: "#0f0f0f", color: "white" }}>
                <Typography variant='h6' sx={{ padding: "4px 0" }}>History</Typography>
                {
                    HistoryList?.HistoryList?.length > 0
                        ? HistoryList?.HistoryList?.map(list => {
                            return <Paper key={list._id} variant="outlined" square sx={{ p: 1.5 }} style={{ backgroundColor: "#0f0f0f", color: "white" }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <Typography variant='subtitle2'>{list.cardName}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant='body2'>
                                            Date: {list.date}/{list.month}/{list.year} Time: {list.hours}:{list.mintues}:{list.seconds}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        
                                        {
                                            list.linkType === "mp4"
                                                ? <Link variant='body2' href={list.link} target="_blank" style={{textDecoration:'none'}}>Video Link <OpenInNewOutlinedIcon style={{width:'20px', marginTop:'10px'}}/></Link>
                                                : <Link variant='body2' href={list.link} target="_blank" style={{textDecoration:'none'}}>Audio Link <OpenInNewOutlinedIcon style={{width:'20px', marginTop:'10px'}}/></Link>
                                                
                                        }


                                    </Grid></Grid>
                            </Paper>
                        })
                        :
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress color="inherit" />
                        </Box>
                }

            </Container>
        </>
    )
}

export default History