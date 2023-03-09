import React, { useState, useEffect } from 'react'
import { Alert, Button, Container, Divider, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import Cards from '../Cards/Cards';
import { updateBucket } from '../../models/actions/BucketListAction';
import { getCardList } from '../../models/actions/CardAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from "../../models/api/url";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "#FFF",
    border: 'none',
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
};

const Buckets = ({ list }) => {
    const dispatch = useDispatch();
    const updateBucketNameState = useSelector(state => state.updateBucketName);
    const AllBucketList = useSelector(state => state.getCardList);
    const initialFormValues = {
        bucketName: list.bucketName,
        bucket_id: list._id
    }

    const [open, setOpen] = useState(false);
    const [updateBucketNameFormValues, setUpdateBucketNameFormValues] = useState(initialFormValues)
    const [bucketList, setBucketList] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateBucketName = (e) => {
        const { name, value } = e.target;
        setUpdateBucketNameFormValues({ ...updateBucketNameFormValues, [name]: value });
    }

    const handleUpdateBucketName = () => {
        if (updateBucketNameFormValues.bucket_id !== "") {
            dispatch(updateBucket(updateBucketNameFormValues));
        }
    }

    const getCardListById = async (bucket_id) => {
        try {
            const response = await axios.post(`${base_url}/getCardList`, { bucket_id });
            setBucketList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCardListById(list._id);
    }, [AllBucketList]);
    useEffect(() => {
        getCardList(list._id);
    }, []);

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                    <Typography variant="h6" sx={{ display: "inline-block" }}>
                        {list.bucketName}
                    </Typography>
                    <Tooltip title="Edit bucket name">
                        <IconButton
                            size="large"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleOpen}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider sx={{ marginBottom: "24px" }} />
                <Box sx={{ columnGap: { sm: "24px" }, justifyContent: { xs: "center", md: "flex-start" }, rowGap: "24px", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                    {
                        bucketList?.length > 0 ?
                            bucketList.map((card, index) => {
                                return <Cards key={card._id} card={card} />
                            })
                            :
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Alert variant="filled" severity="error">
                                    No Cards
                                </Alert>
                            </Box>
                    }
                </Box>
            </Container>

            {/* modal */}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {
                        updateBucketNameState.Error && updateBucketNameState.ErrorMessage !== "" ?
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {updateBucketNameState.ErrorMessage}
                            </Alert>
                            : updateBucketNameState.ErrorMessage !== "" ?
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    {updateBucketNameState.ErrorMessage}
                                </Alert>
                                : ""
                    }

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create new bucket
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Bucket Name"
                        variant="outlined"
                        name="bucketName"
                        sx={{ width: "100%", mt: "10px" }}
                        onChange={updateBucketName}
                        value={updateBucketNameFormValues.bucketName}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            pt: "16px",
                            position: 'relative'
                        }}>
                        <Button
                            variant="contained"
                            onClick={handleUpdateBucketName}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default Buckets