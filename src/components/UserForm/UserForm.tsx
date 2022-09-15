import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {User} from '../../models';
import {initialFormModel} from './formModel';
import {Form, Formik} from 'formik';
import Input from '../Input/Input';
import {userValidationSchema} from './validationSchema';
import FooterButtons from '../FooterButtons/FooterButtons';
import {putService} from '../../apiClient/apiClient';
import {ToastTypes, ToastUtils} from '../../utils/utils';

export type UserFormProps = {
    userInfo: User;
};

const UserForm = ({userInfo}: UserFormProps) => {
    const [changeBtnStatus, setChangeBtnStatus] = useState(false);
    const ref = useRef(userInfo);

    const submitChange = (values: User) => {
        const {id, photo, ...restValues} = values;

        putService(`/users/${id}`, restValues).then(() => {
            setChangeBtnStatus(true);
            ToastUtils.notifyToast(ToastTypes.SUCCESS, 'User successfully updated');
        });
    };

    const onCancelClick = useCallback((resetForm: VoidFunction) => {
        // formik function to reset Data initial state
        resetForm();
        setChangeBtnStatus(true);
    }, []);

    useEffect(() => {
        // revert buttons functionality when change user with help of ref
        if (JSON.stringify(ref.current) !== JSON.stringify(userInfo)) setChangeBtnStatus(false);
    }, [userInfo]);

    const memoizedStatus = useMemo(() => changeBtnStatus, [changeBtnStatus]);

    return (
        <Container id={`#${userInfo.id}`}>
            <Row className="m-auto mt-3 container-fluid">
                <Col>
                    <Formik<User>
                        enableReinitialize
                        validateOnMount
                        initialValues={userInfo}
                        validationSchema={userValidationSchema}
                        onSubmit={submitChange}
                    >
                        {({handleSubmit, resetForm}) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="align-items-center">
                                    <Row>
                                        {initialFormModel.map((item) => (
                                            <Col className="mb-3" xs={12} key={item.id}>
                                                <Input {...item} />
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row className="mt-4 justify-content-end">
                                        <FooterButtons
                                            handleCancel={() => onCancelClick(resetForm)}
                                            statusChanged={memoizedStatus}
                                        />
                                    </Row>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
};

export default UserForm;
