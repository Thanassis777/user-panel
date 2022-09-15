import {Button, Col} from 'react-bootstrap';
import React from 'react';
import './FooterButtons.scss';

export type FooterButtonsProps = {
    handleCancel: VoidFunction;
    statusChanged: boolean;
};

const FooterButtons = React.memo(({handleCancel, statusChanged}: FooterButtonsProps) => (
    <>
        {!statusChanged && (
            <Col className="button-columns" xs="auto">
                <Button id="cancel-Btn" variant="info" onClick={handleCancel}>
                    Cancel
                </Button>
            </Col>
        )}
        <Col className="button-columns" xs="auto">
            <Button id="save-Btn" disabled={statusChanged} type="submit">
                Save
            </Button>
        </Col>
    </>
));

export default FooterButtons;
