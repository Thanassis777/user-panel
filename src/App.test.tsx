import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {axiosInstance} from './apiClient/apiClient';
import MockAdapter from 'axios-mock-adapter';
import {UserListProps} from './components/UserList/UserList';
import {UserFormProps} from './components/UserForm/UserForm';

const mockUsers = [
    {
        id: '1',
        photo: 'https://randomuser.me/api/portraits/men/40.jpg',
        name: 'Bates Washington',
        company: 'ZOLAREX',
        email: 'bates.washington@zolarex.io',
        phone: '+1 (915) 447-2207',
        address: '958 Brevoort Place, Ona, Maine, 2433',
    },
    {
        id: '2',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'Mollie Oneill',
        company: 'VIAGRAND',
        email: 'mollie.oneill@viagrand.biz',
        phone: '+1 (852) 535-3880',
        address: '120 Cedar Street, Mansfield, Kentucky, 8890',
    },
];

const userClickFn = jest.fn();

function MockUserForm(props: UserFormProps) {
    return (
        <div>
            <div data-testid="userInfo">{JSON.stringify(props.userInfo)}</div>
        </div>
    );
}

function MockUserList(props: UserListProps) {
    return (
        <div>
            <div data-testid="users">{JSON.stringify(props.data)}</div>
            <button onClick={() => userClickFn(props.onUserClick)} data-testid="userItem">
                click me
            </button>
        </div>
    );
}

jest.mock('./components/UserForm/UserForm', () => ({
    __esModule: true,
    default: MockUserForm,
}));

jest.mock('./components/UserList/UserList', () => ({
    __esModule: true,
    default: MockUserList,
}));

describe('App test suite', () => {
    let axiosMock: MockAdapter;
    // jest.setTimeout(20000);

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
        jest.useFakeTimers();
    });

    const renderComp = () => render(<App />);

    it('should render component loading users from API', async () => {
        axiosMock.onGet('/users').reply(200, mockUsers);
        renderComp();

        jest.advanceTimersByTime(2000);

        const loadedUsers = await screen.findByTestId('users');

        await waitFor(() => {
            expect(loadedUsers).toHaveTextContent(JSON.stringify(mockUsers));
        });

        expect(axiosMock.history.get.filter((request) => request.url === '/users').length).toBe(1);
        expect(await screen.findByText('Select a user to edit:')).toBeInTheDocument();
    });

    it('should click a user ', async () => {
        axiosMock.onGet('/users').reply(200, mockUsers);
        axiosMock.onGet('/users/2').reply(200, mockUsers[1]);

        userClickFn.mockImplementation((fn) => {
            fn('2');
        });

        renderComp();

        jest.advanceTimersByTime(2000);

        const selectUser = await screen.findByTestId('userItem');

        await act(async () => {
            await fireEvent.click(selectUser);
        });

        await waitFor(() => {
            const userInfo = screen.getByTestId('userInfo');

            expect(userInfo).toHaveTextContent(JSON.stringify(mockUsers[1]));
        });
    });
});
