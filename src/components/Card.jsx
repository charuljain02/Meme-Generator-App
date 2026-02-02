import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';


const MemeCard = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <Card style={{ width: "18rem", margin: "25px" }}>
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Button
                        onClick={() => navigate(`/edit?url=${props.img}`)}
                        variant="primary"
                    >
                        Edit
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MemeCard;
