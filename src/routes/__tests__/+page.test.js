// src/routes/__tests__/+page.test.js
import { render, fireEvent } from '@testing-library/svelte';
import LandingPage from '../+page.svelte';  // Adjust the path as needed

beforeEach(() => {
    delete window.location;
    window.location = { href: '' }; // Mocking window.location
});

describe('Landing Page', () => {
    it('renders welcome message and buttons', () => {
        const { getByText } = render(LandingPage);

        expect(getByText('Welcome to GreenShift')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Sign up')).toBeInTheDocument();
    });

    it('navigates to login page when login button is clicked', async () => {
        const { getByText } = render(LandingPage);
        const loginButton = getByText('Login');

        await fireEvent.click(loginButton);

        expect(window.location.href).toBe('http://localhost/login'); // Check the expected URL
    });

    it('navigates to signup page when signup button is clicked', async () => {
        const { getByText } = render(LandingPage);
        const signupButton = getByText('Sign up');

        await fireEvent.click(signupButton);

        expect(window.location.href).toBe('http://localhost/signup'); // Check the expected URL
    });
});