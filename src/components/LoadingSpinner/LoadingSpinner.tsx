import {Spinner} from 'react-bootstrap';
import {SpinnerProps} from 'react-bootstrap/Spinner';

const LoadingSpinner = (props: Partial<SpinnerProps>) => (
    <div>
        <Spinner
            className="spinner-border"
            variant="primary"
            animation="border"
            role="status"
            {...props}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
);

export default LoadingSpinner;
