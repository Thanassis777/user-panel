import {ToastTypes, ToastUtils} from './utils';
import {render, screen, act, fireEvent} from '@testing-library/react';
import ToastMessage from '../hoc/ToastMessage';
import {Button} from 'react-bootstrap';

describe('utils test suite', () => {
    const renderComponent = (message: string, type: ToastTypes) =>
        render(
            <ToastMessage>
                <Button onClick={() => ToastUtils.notifyToast(type, message)}>test</Button>
            </ToastMessage>
        );

    it('should alert success message', async () => {
        renderComponent('Test_message', ToastTypes.SUCCESS);
        const alertBtn = screen.getByRole('button');

        await act(async () => {
            fireEvent.click(alertBtn);
        });

        expect(await screen.findByText('Test_message')).toBeInTheDocument();
    });

    it('should alert error message', async () => {
        renderComponent('error_message', ToastTypes.ERROR);
        const alertBtn = screen.getByRole('button');

        await act(async () => {
            fireEvent.click(alertBtn);
        });

        expect(await screen.findByText('error_message')).toBeInTheDocument();
    });

    it('should alert info message', async () => {
        renderComponent('info_message', ToastTypes.INFO);
        const alertBtn = screen.getByRole('button');

        await act(async () => {
            fireEvent.click(alertBtn);
        });

        expect(await screen.findByText('info_message')).toBeInTheDocument();
    });

    it('should alert info message', async () => {
        renderComponent('info_message', ToastTypes.INFO);
        const alertBtn = screen.getByRole('button');

        await act(async () => {
            fireEvent.click(alertBtn);
        });

        expect(await screen.findByText('info_message')).toBeInTheDocument();
    });

    it('should alert warning message', async () => {
        renderComponent('warning_message', ToastTypes.WARNING);
        const alertBtn = screen.getByRole('button');

        await act(async () => {
            fireEvent.click(alertBtn);
        });

        expect(await screen.findByText('warning_message')).toBeInTheDocument();
    });
});
