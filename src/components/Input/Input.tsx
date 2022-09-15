import React from 'react';
import {useField} from 'formik';
import Form from 'react-bootstrap/Form';
import {InputProps} from '../../models';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import './Input.scss';

const Input = (props: InputProps) => {
    const [field, meta] = useField(props.name);

    return (
        <>
            <Form.Label style={{color: 'grey'}} htmlFor={props.id}>
                {props.label}
            </Form.Label>
            <Form.Control
                className="form-control"
                id={props.id}
                isInvalid={meta.touched && Boolean(meta.error)}
                placeholder={`Enter ${props.label.toLowerCase()}`}
                {...props}
                {...field}
            />
            <InputErrorMessage name={field.name} />
        </>
    );
};

export default Input;
