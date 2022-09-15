import React, {CSSProperties, useCallback, useEffect, useMemo, useState} from 'react';
import './App.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {Container} from 'react-bootstrap';
import {getService} from './apiClient/apiClient';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import {FieldErrorMessages, User} from './models';
import ToastMessage from './hoc/ToastMessage';
import {ToastTypes, ToastUtils} from './utils/utils';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const spinnerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
} as CSSProperties;

function App() {
    const [data, setData] = useState<User[]>([]);
    const [displayInfo, setDisplayInfo] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = () =>
            getService('/users')
                .then(({data}) => {
                    setIsLoading(false);
                    setData(data);
                    if (data.length > 0) {
                        ToastUtils.notifyToast(ToastTypes.INFO, 'Select a user to edit:', {
                            position: 'top-center',
                        });
                    }
                })
                .finally(() => setIsLoading(false));

        setTimeout(() => {
            fetchUsers();
        }, 1000);
    }, []);

    const onUserClick = useCallback((id: string) => {
        getService(`/users/${id}`).then(({data}) => setDisplayInfo(data));
    }, []);

    const memoizedUserData = useMemo(() => data, [data]);

    return (
        <ToastMessage>
            {isLoading ? (
                <LoadingSpinner style={spinnerStyle} />
            ) : (
                <Container className="container">
                    <Tab.Container id="list-group-tabs-example">
                        <Row className="flex-nowrap">
                            {data.length === 0 ? (
                                <h1>{FieldErrorMessages.EMPTY_DATA}</h1>
                            ) : (
                                <Col className="users-list" xs={1} sm={3} md={6}>
                                    <UserList data={memoizedUserData} onUserClick={onUserClick} />
                                </Col>
                            )}

                            {displayInfo !== undefined && (
                                <Col xs={9} sm={8} md={6} className="user-form">
                                    <Tab.Content>
                                        <UserForm userInfo={displayInfo} />
                                    </Tab.Content>
                                </Col>
                            )}
                        </Row>
                    </Tab.Container>
                </Container>
            )}
        </ToastMessage>
    );
}

export default App;
