import {ToastContainer} from 'react-toastify';
import {injectStyle} from 'react-toastify/dist/inject-style';

type ToastMessageProps = {
    children: React.ReactNode;
};

const ToastMessage = ({children}: ToastMessageProps) => {
    if (typeof window !== 'undefined') {
        injectStyle();
    }

    return (
        <>
            <ToastContainer />
            {children}
        </>
    );
};

export default ToastMessage;
