import React from 'react';
import { render, screen, fireEvent , waitFor } from '@testing-library/react';
import Account from '../src/pages/Account';
import { consumeUserApi } from '../src/api/user';
import '@testing-library/jest-dom'

jest.mock("../src/components/Footer/Footer", () => () => <div data-testid="mocked-footer">Mocked Footer</div>);

jest.mock('../src/components/CourseCard/CardPaid', () => ({ picture, course, rating, topic, author, level, module, time, price, isPaid }) => (
    <div data-testid="mock-card">
    </div>
));

jest.mock('../src/components/Allert/AllertReset', () => ({ message, type }) => (
    <div data-testid="mock-alert">
    </div>
));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../src/lib/firebaseInit', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
}));

jest.mock('../src/api/user', () => ({
    consumeUserApi: {
        getCurrentUser: jest.fn(() => Promise.resolve({ data: {} })),
        updateUser: jest.fn(() => Promise.resolve({ status: 'OK' })),
        updatePassword: jest.fn(() => Promise.resolve({ status: 'OK' })),
    },
}));

jest.mock('../src/api/order', () => ({
    consumeOrderApi: {
        getOrderUser: jest.fn(() => Promise.resolve({ status: 'OK', data: [] })),
    },
}));


describe('Account Component', () => {

    beforeEach(() => {
        render(<Account />);
    });

    it('renders Account component', async () => {
        
        expect(screen.getByText('Kembali ke Beranda')).toBeInTheDocument();

    });

    it('updates user profile on button click', async () => {
        
        const saveProfileButton = screen.getByTestId('up-profile-button'); 

        expect(saveProfileButton).toBeInTheDocument();

        const mockUserData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789',
            country: 'Country',
            city: 'City',
        };
        
        consumeUserApi.getCurrentUser.mockResolvedValue({ data: mockUserData });
        fireEvent.click(saveProfileButton);

        // await waitFor(() => {
        //     expect(consumeUserApi.updateUser).toHaveBeenCalledWith(mockUserData);
        // });
    });

});
