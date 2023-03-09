import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Alert, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, TextField, Tooltip } from '@mui/material';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import MenuIcon from '@mui/icons-material/Menu';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import { addNewBucket } from '../../models/actions/BucketListAction';
import { addNewCard } from '../../models/actions/CardAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import youtube from '../../assets/yt-logo-mobile.png';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
};

export default function Navbar() {

    const dispatch = useDispatch();
    const NewBucketState = useSelector(state => state.addNewBucket)
    const BucketList = useSelector(state => state.getBucketList);

    const initialCardFormValues = {
        Bucket_id: "",
        CardName: "",
        Link: "",
        LinkType: ""
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [openBucketModal, setOpenBucketModal] = useState(false);
    const [openCardModal, setOpenCardModal] = useState(false);
    const [bucketName, setBucketName] = useState("");
    const [cardFormValues, setCardFormValues] = useState(initialCardFormValues)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenBucketModal(false);
        setOpenCardModal(false);
    };
    const handleOpen = (modal) => {
        if (modal === "New Bucket") {
            setOpenBucketModal(true);
            setAnchorEl(null);
        } else if (modal === "New Card") {
            setOpenCardModal(true);
            setAnchorEl(null);
        }
    }

    const handleCardFormValues = (e) => {
        const { name, value } = e.target;
        setCardFormValues({ ...cardFormValues, [name]: value });
    }

    const handleBucketName = (e) => {
        setBucketName(e.target.value);
    }

    const handlAddBucketName = () => {
        if (bucketName) {
            dispatch(addNewBucket(bucketName));
        }
        setBucketName("");
    }

    const handlAddNewCard = () => {
        if (cardFormValues.Bucket_id !== "" && cardFormValues.CardName !== "" && cardFormValues.Link !== "" && cardFormValues.LinkType !== "") {
            dispatch(addNewCard(cardFormValues));
            setCardFormValues(initialCardFormValues);
        } else {
            alert("All fields are required")
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" style={{ backgroundColor: "#0f0f0f" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <SmartDisplayRoundedIcon style={{ marginRight: "5px", color: "red" }} /> */}
                        <img src ={youtube} alt="youtube" style={{width:"30px", marginRight:'10px'}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <Link to="/" style={{ color: "#FFF" }}>
                                VIN-PLAYER
                            </Link>
                        </Typography>
                        <IconButton
                            size="large"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            color="inherit"
                        >
                            <VideoCallRoundedIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleOpen("New Bucket")} >
                                <ListItemIcon>
                                    <AddCircleRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>New bucket</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => handleOpen("New Card")}>
                                <ListItemIcon>
                                    <AddCircleRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>New card</ListItemText>
                            </MenuItem>
                        </Menu>
                        <Tooltip title="History">
                            <Link to="/history" style={{ color: "#FFF" }}>
                                <Button variant="outlined" startIcon={<HistoryRoundedIcon />}>
                                    History
                                </Button>
                            </Link>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* modal */}
            <Modal
                open={openBucketModal}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {
                        NewBucketState.Error && NewBucketState.ErrorMessage !== "" ?
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {NewBucketState.ErrorMessage}
                            </Alert>
                            : NewBucketState.ErrorMessage !== "" ?
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    {NewBucketState.ErrorMessage}
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
                        sx={{ width: "100%", mt: "10px" }}
                        onChange={handleBucketName}
                        value={bucketName}
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
                            onClick={handlAddBucketName}
                            style={{backgroundColor:'green'}}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {/* card modal */}
            <Modal
                open={openCardModal}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create new card
                    </Typography>

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Bucket"
                        sx={{ width: "100%", mt: "10px" }}
                        defaultValue=''
                        name='Bucket_id'
                        onChange={handleCardFormValues}
                        value={cardFormValues.Bucket_id}
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
                        name='CardName'
                        sx={{ width: "100%", mt: "10px" }}
                        onChange={handleCardFormValues}
                        value={cardFormValues.CardName}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Link Type"
                        sx={{ width: "100%", mt: "10px" }}
                        defaultValue=''
                        name='LinkType'
                        onChange={handleCardFormValues}
                        value={cardFormValues.LinkType}
                    >
                        <MenuItem value="mp3">mp3</MenuItem>
                        <MenuItem value="mp4">mp4</MenuItem>
                    </TextField>
                    <TextField
                        id="outlined-basic"
                        label="Link"
                        variant="outlined"
                        name='Link'
                        sx={{ width: "100%", mt: "10px" }}
                        onChange={handleCardFormValues}
                        value={cardFormValues.Link}
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
                            onClick={handlAddNewCard}
                            style ={{ backgroundColor: "green"}}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}