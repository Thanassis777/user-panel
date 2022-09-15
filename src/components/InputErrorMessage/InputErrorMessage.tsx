import {ErrorMessage} from 'formik';
import './InputErrorMessage.scss';

type FieldErrorMessageProps = {
    name: string;
};

type CustomErrorProps = {
    message: string;
};

const CustomError = ({message}: CustomErrorProps) => <div className="errorMessage">{message}</div>;

const InputErrorMessage = ({name}: FieldErrorMessageProps) => (
    <ErrorMessage name={name}>{(msg) => <CustomError message={msg} />}</ErrorMessage>
);

export default InputErrorMessage;
