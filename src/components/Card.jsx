import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import './Card.css';

const MemeCard = ({ img, title }) => {
    const navigate = useNavigate();

    return (
        <Card classname="meme-card text-center shadow-sm">
            <div classname="card-img-wrapper">
                <Card.Img variant="top" src={img} classname="meme-card-img" loading="lazy" />
            </div>
            <Card.Body classname="bg-dark p-3">
                <Card.Title classname="meme-card-title mb-3">{title}</Card.Title>
                <Button 
                    onClick={() => navigate(`/edit?url=${encodeURIComponent(img)}`)}
                    classname="meme-card-btn w-100"
                >
                    ⚡ Edit Template
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MemeCard;