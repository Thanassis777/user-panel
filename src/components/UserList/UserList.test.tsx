import {act, render, screen} from '@testing-library/react';
import UserList from './UserList';

const mockData = [
    {
        id: '5c093af1c6ee9117a581c7d6',
        photo: 'testPhoto',
        name: 'Bates Washington',
        company: 'ZOLAREX',
        email: 'bates.washington@zolarex.io',
        phone: '+1 (915) 447-2207',
        address: '958 Brevoort Place, Ona, Maine, 2433',
    },
];

describe('UserList test suite', () => {
    const mockUserClick = jest.fn();

    const renderComponent = () => render(<UserList data={mockData} onUserClick={mockUserClick} />);

    it('should render component properly', () => {
        renderComponent();

        const userName = screen.getByText('Bates Washington');
        const userEmail = screen.getByText('bates.washington@zolarex.io');
        const userImage = screen.getByRole('img');

        expect(userName).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(userImage).toHaveAttribute('src', 'testPhoto');
    });

    it('should click successfully a user', async () => {
        const component = renderComponent();

        const userItems = component.container.querySelectorAll('a');
        expect(userItems).toHaveLength(1);

        await act(async () => {
            userItems[0]!.click();
        });

        expect(mockUserClick).toBeCalled();
    });
});
