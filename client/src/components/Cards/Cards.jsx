import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, useRef } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, updateCard } from '../../models/actions/CardAction';
import { saveHistory } from '../../models/actions/HistoryAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "#fff",
    border: 'none',
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
};

const playedHistory = {
    cardName: "",
    link: "",
    linkType: "",
    year: "",
    month: "",
    date: "",
    hours: "",
    mintues: "",
    seconds: ""
}

const Cards = ({ card }) => {
    const videoRef = useRef();
    const audioRef = useRef();

    const dispatch = useDispatch();
    const BucketList = useSelector(state => state.getBucketList);
    const updatedCardState = useSelector(state => state.updateCard);
    const initialFormValues = {
        card_id: card._id,
        bucket_id: card.bucket_id,
        cardName: card.cardName,
        link: card.link,
        linkType: card.linkType
    }

    const [open, setOpen] = useState(false);
    const [openModal, setModalOpen] = useState(false);

    const [updateCardFormValue, setUpdateCardFormValue] = useState(initialFormValues)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const updateCardDetails = (e) => {
        const { name, value } = e.target;
        setUpdateCardFormValue({ ...updateCardFormValue, [name]: value })
    }

    const handleUpdateCard = (card_id, bucket_id) => {
        if (updateCardFormValue.cardName !== "" && updateCardFormValue.link !== "" && updateCardFormValue.linkType !== "") {
            dispatch(updateCard(updateCardFormValue));
        }
    }

    const handleDeleteCard = (card_id, bucket_id) => dispatch(deleteCard({ card_id, bucket_id }));

    const playVideo = () => {
        if (!videoRef?.current?.paused) {
            const date = new Date();
            playedHistory.cardName = card.cardName;
            playedHistory.link = card.link;
            playedHistory.linkType = card.linkType;
            playedHistory.year = date.getFullYear();
            playedHistory.month = date.getMonth();
            playedHistory.date = date.getDate() + 1;
            playedHistory.hours = date.getHours();
            playedHistory.mintues = date.getMinutes();
            playedHistory.seconds = date.getSeconds();
            dispatch(saveHistory(playedHistory));
        }
    }
    const playAudio = () => {
        if (!audioRef?.current?.paused) {
            const date = new Date();
            playedHistory.cardName = card.cardName;
            playedHistory.link = card.link;
            playedHistory.linkType = card.linkType;
            playedHistory.year = date.getFullYear();
            playedHistory.month = date.getMonth() + 1;
            playedHistory.date = date.getDate();
            playedHistory.hours = date.getHours();
            playedHistory.mintues = date.getMinutes();
            playedHistory.seconds = date.getSeconds();
        }
        dispatch(saveHistory(playedHistory));
    }



    return (
        <>
            <Card sx={{
                maxWidth: 350, minWidth: 350, backgroundColor: "#0f0f0f", transition: "transform .2s", "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#1a1a1a",
                }, borderRadius: "20px"
            }}>
                <CardMedia onClick={handleModalOpen}>
                    {card.linkType === "mp4" ? (
                        <video ref={videoRef} width="360px">
                            <source src={card.link} type="video/mp4" />
                        </video>
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mt: 2,
                            }}

                        >
                            <audio ref={audioRef} controls>
                                <source src={card.link} type="audio/mp3" />
                            </audio>
                        </Box>
                    )}
                </CardMedia>
                <div>
                    <Modal open={openModal} onClick={handleModalClose} >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }} onClick={() => {
                            playedHistory.cardName = card.cardName;
                            playedHistory.link = card.link;
                            playedHistory.linkType = card.linkType;
                            playedHistory.year = new Date().getFullYear();
                            playedHistory.month = new Date().getMonth() + 1;
                            playedHistory.date = new Date().getDate();
                            playedHistory.hours = new Date().getHours();
                            playedHistory.mintues = new Date().getMinutes();
                            playedHistory.seconds = new Date().getSeconds();
                            dispatch(saveHistory(playedHistory));
                        }} >
                            {card.linkType === "mp4" ? (
                                <video ref={videoRef} width="65%" onClick={playVideo} controls autoPlay>
                                    <source src={card.link} type="video/mp4" />
                                </video>
                            ) : (
                                <audio ref={audioRef} onPlay={playAudio} autoplay controls>
                                    <source src={card.link} />
                                </audio>
                            )}
                        </Box>
                    </Modal>
                </div>
                {/* Content */}
                <CardContent>
                    <Typography variant="body1" color="text.primary" style={{ color: "#fff" }}>
                        {card.cardName}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            aria-haspopup="true"
                            color="#ffff"
                            onClick={handleOpen}
                        >
                            <EditIcon style={{ color: "#fff" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            aria-haspopup="true"
                            color="#424242"
                            onClick={() => handleDeleteCard(card._id, card.bucket_id)}
                        >
                            <DeleteIcon style={{ color: "#fff" }} />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>

            {/* update card modal */}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {
                        updatedCardState.Error && updatedCardState.ErrorMessage !== "" ?
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {updatedCardState.ErrorMessage}
                            </Alert>
                            : updatedCardState.ErrorMessage !== "" ?
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    {updatedCardState.ErrorMessage}
                                </Alert>
                                : ""
                    }

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Card Details
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Bucket"
                        sx={{ width: "100%", mt: "10px" }}
                        defaultValue=''
                        name='bucket_id'
                        onChange={updateCardDetails}
                        value={updateCardFormValue.bucket_id}
                    >
                        {BucketList.BucketList.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.bucketName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-basic"
                        label="Card Name"
                        variant="outlined"
                        name='cardName'
                        sx={{ width: "100%", mt: "10px" }}
                        onChange={updateCardDetails}
                        value={updateCardFormValue.cardName}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Link Type"
                        sx={{ width: "100%", mt: "10px" }}
                        defaultValue={updateCardFormValue.linkType}
                        name='linkType'
                        onChange={updateCardDetails}
                        value={updateCardFormValue.linkType}
                    >
                        <MenuItem value="mp3">mp3</MenuItem>
                        <MenuItem value="mp4">mp4</MenuItem>
                    </TextField>
                    <TextField
                        id="outlined-basic"
                        label="Link"
                        variant="outlined"
                        name='link'
                        sx={{ width: "100%", mt: "10px" }}
                        onChange={updateCardDetails}
                        value={updateCardFormValue.link}
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
                            onClick={handleUpdateCard}
                            style={{ backgroundColor: "green" }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default Cards;