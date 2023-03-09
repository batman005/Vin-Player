import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import{Checkbox, Menu, MenuItem,IconButton } from '@mui/material';
import { deleteCard } from '../../models/actions/CardAction';
import { getCardList } from '../../models/actions/CardAction';

const DeleteButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);
    const cardList = useSelector((state) => state.getCardList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardList());
    }, [dispatch]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (event) => {
        const cardName = event.target.value;
        const newSelectedCards = selectedCards.includes(cardName)
            ? selectedCards.filter((selectedCard) => selectedCard !== cardName)
            : [...selectedCards, cardName];
        setSelectedCards(newSelectedCards);
    };

    const handleDeleteClick = async () => {
        // Handle delete logic for selected cards
        await Promise.all(selectedCards.map((cardName) => dispatch(deleteCard(cardName))));
        setSelectedCards([]);
        handleClose();
    };

    return (
        <>
            <IconButton
                size="large"
                aria-controls={anchorEl ? 'delete-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <DeleteIcon />
            </IconButton>
            <Menu
                id="delete-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {cardList.map((card) => (
                    <MenuItem key={card.id}>
                        <Checkbox
                            value={card.name}
                            checked={selectedCards.includes(card.name)}
                            onChange={handleCheckboxChange}
                        />
                        {card.name}
                    </MenuItem>
                ))}
                {selectedCards.length > 0 ? (
                    <MenuItem>
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                        Delete Cards
                    </MenuItem>
                ) : null}
            </Menu>
        </>
    );
};

export default DeleteButton;