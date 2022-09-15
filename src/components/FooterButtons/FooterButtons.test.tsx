import {act, render, screen} from '@testing-library/react';
import FooterButtons from './FooterButtons';

describe('FooterButtons test suite', () => {
    const mockCancel = jest.fn();
    const statusChanged = false;

    const renderComponent = (status = statusChanged) =>
        render(<FooterButtons handleCancel={mockCancel} statusChanged={status} />);

    it('should render properly', () => {
        renderComponent();

        const cancelBtn = screen.getByRole('button', {name: 'Cancel'});
        const saveBtn = screen.getByRole('button', {name: 'Save'});
        const allButtons = screen.getAllByRole('button');

        expect(cancelBtn).toBeInTheDocument();
        expect(saveBtn).toBeInTheDocument();
        expect(allButtons).toHaveLength(2);
    });

    it('should render without cancel button', () => {
        renderComponent(true);

        const cancelBtn = screen.queryByRole('button', {name: 'Cancel'});
        const saveBtn = screen.getByRole('button', {name: 'Save'});
        const allButtons = screen.getAllByRole('button');

        expect(cancelBtn).not.toBeInTheDocument();
        expect(saveBtn).toBeInTheDocument();
        expect(allButtons).toHaveLength(1);
    });

    it('should click successfully', async () => {
        renderComponent();

        const allButtons = screen.getAllByRole('button');

        await act(async () => {
            allButtons[0].click();
            allButtons[1].click();
        });

        expect(mockCancel).toBeCalledTimes(1);
    });
});
