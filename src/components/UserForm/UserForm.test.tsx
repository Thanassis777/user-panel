import {act, fireEvent, render, screen} from '@testing-library/react';
import UserForm from './UserForm';
import MockAdapter from 'axios-mock-adapter';
import {FooterButtonsProps} from '../FooterButtons/FooterButtons';
import {axiosInstance} from '../../apiClient/apiClient';

const testUser = {
    id: '5c093af1c6ee9117a581c7d6',
    photo: 'https://randomuser.me/api/portraits/men/40.jpg',
    name: 'Bates Washington',
    company: 'ZOLAREX',
    email: 'testMail@a.com',
    phone: '423432',
    address: 'Maine',
};

function MockFooterButtons(props: FooterButtonsProps) {
    return (
        <div>
            <div data-testid="status">{JSON.stringify(props.statusChanged)}</div>
            <button type="submit" data-testid="saveBtn">
                save
            </button>
            <button onClick={props.handleCancel} data-testid="cancelBtn">
                cancel
            </button>
        </div>
    );
}

jest.mock('../FooterButtons/FooterButtons', () => ({
    __esModule: true,
    default: MockFooterButtons,
}));

describe('UserForm test suite', () => {
    const renderComp = () => render(<UserForm userInfo={testUser} />);

    it('should render component properly', async () => {
        renderComp();

        const allTextBoxes = screen.getAllByRole('textbox');
        expect(allTextBoxes).toHaveLength(5);
        const status = screen.getByTestId('status');

        expect(allTextBoxes[0]).toHaveValue('Bates Washington');
        expect(allTextBoxes[1]).toHaveValue('testMail@a.com');
        expect(allTextBoxes[2]).toHaveValue('423432');
        expect(allTextBoxes[3]).toHaveValue('Maine');
        expect(allTextBoxes[4]).toHaveValue('ZOLAREX');
        expect(status).toHaveTextContent('false');
    });

    it('should cancel successfully a user', async () => {
        renderComp();

        const cancelBtn = screen.getByTestId('cancelBtn');
        const status = screen.getByTestId('status');

        await act(async () => {
            cancelBtn.click();
        });

        expect(status).toHaveTextContent('true');
    });

    it('should save successfully a user', async () => {
        const axiosMock = new MockAdapter(axiosInstance);
        axiosMock.onPut('/users/5c093af1c6ee9117a581c7d6').reply(200);

        renderComp();

        const user_name = screen.getByRole('textbox', {name: 'Name'});
        expect(user_name).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(user_name, {target: {value: 'test_Name'}});
        });

        const saveBtn = screen.getByTestId('saveBtn');
        const status = screen.getByTestId('status');

        await act(async () => {
            saveBtn.click();
        });

        expect(status).toHaveTextContent('true');
    });
});
