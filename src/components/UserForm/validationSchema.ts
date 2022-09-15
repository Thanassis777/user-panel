import * as Yup from 'yup';
import {FieldErrorMessages} from '../../models';

export const userValidationSchema = Yup.object().shape({
    phone: Yup.string().required(FieldErrorMessages.MANDATORY_FIELD),
    name: Yup.string().required(FieldErrorMessages.MANDATORY_FIELD),
    email: Yup.string()
        .required(FieldErrorMessages.MANDATORY_FIELD)
        .email(FieldErrorMessages.INVALID_EMAIL),
    company: Yup.string(),
    address: Yup.string(),
});
