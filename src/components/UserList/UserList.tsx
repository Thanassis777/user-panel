import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import {User} from '../../models';
import './UserList.scss';

export type UserListProps = {
    data: User[];
    onUserClick: (id: string) => void;
};

const UserList = ({data, onUserClick}: UserListProps) => (
    <ListGroup className="custom-list-group">
        {data.map((item) => (
            <ListGroup.Item
                key={item.id}
                onClick={() => onUserClick(item.id)}
                className="custom-list-item"
                action
                href={`#${item.id}`}
            >
                <div className="d-flex align-items-center">
                    <Image className="list-image" width="80" src={item.photo} roundedCircle />
                    <Col className="mx-4 user-info">
                        <h6>{item.name}</h6>
                        <div id="email-label">{item.email}</div>
                    </Col>
                </div>
            </ListGroup.Item>
        ))}
    </ListGroup>
);

export default React.memo(UserList);
