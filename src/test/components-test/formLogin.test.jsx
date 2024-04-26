import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useDispatch, useSelector } from 'react-redux';
import FormLogin from '../../view/components/login/FormLogin';
import { loginUser } from '../../redux/features/auth/authThunk';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../redux/features/auth/authThunk', () => ({
  loginUser: vi.fn(),
}));

/**
 *
 * SKENARIO TESTING
 *
 * Component: FormLogin
 *
 *   - Should render correctly
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call login function when login button is clicked
 *
 */
describe('Form Login', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useSelector.mockReturnValue({
      auth: {
        isError: false,
        isLoading: false,
        message: '',
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Should render correctly', () => {
    // Arrange
    render(<FormLogin />);

    // Assert
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Masuk')).toBeInTheDocument();
  });

  it('Should handle email typing correctly', async () => {
    // Arrange
    render(<FormLogin />);
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'johndoe@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('johndoe@gmail.com');
  });

  it('Should handle password typing correctly', async () => {
    // Arrange
    render(<FormLogin />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('Should call login function when login button is clicked', async () => {
    // Arrange
    loginUser.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(loginUser);

    render(<FormLogin />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Masuk');

    // Action
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(submitButton);

    // Assert
    expect(loginUser).toHaveBeenCalledWith({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });

    expect(passwordInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});
