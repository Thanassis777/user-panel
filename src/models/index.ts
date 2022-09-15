import {FormControlProps} from 'react-bootstrap';

export interface User {
    id: string;
    photo: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
}

export interface InputProps extends FormControlProps {
    label: string;
    name: string;
}

export enum FieldErrorMessages {
    MANDATORY_FIELD = 'Field is mandatory',
    INVALID_EMAIL = 'Field should be a valid email address',
    EMPTY_DATA = 'Error: Server could not send your data or there are no users to display...',
}
