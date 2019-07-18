import React from 'react';
import 'element-theme-default';
import { Button,Card } from 'element-react';

const UserCard = (props) => {
    return (
        <Card className="box-card">
            <div className="text item"><span>Name: </span>{props.name}</div>
            <div className="text item"><span>Email: </span>{props.email}</div>
            <div className="text item"><span>Phone No: </span>{props.phone}</div>
            <div className="text item"><span>Status: </span>{props.status}</div>
            <hr></hr>
            <Button plain={true} type="primary">Edit</Button>
            <Button plain={true} type="danger">Delete</Button>
        </Card>
    )
}

export default UserCard;