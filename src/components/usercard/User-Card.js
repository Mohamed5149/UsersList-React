import React from 'react';
import 'element-theme-default';
import { Button, Card } from 'element-react';

const UserCard = (props) => {

    let editButton = props.userRole === "Admin" ? <Button onClick={props.edit} plain={true} type="primary">Edit</Button> : null;
    let deleteButton = props.userRole === "Admin" ? <Button onClick={props.delete} plain={true} type="danger">Delete</Button> : null;
    return (
        <Card className="box-card">
            <div className="text item"><span>Name: </span>{props.name}</div>
            <div className="text item"><span>Email: </span>{props.email}</div>
            <div className="text item"><span>Phone No: </span>{props.phone}</div>
            <div className="text item"><span>Status: </span>{props.status}</div>
            <div className="text item"><span>Role: </span>{props.role}</div>
            <hr></hr>
            {editButton}
            {deleteButton}
        </Card>
    )
}

export default UserCard;