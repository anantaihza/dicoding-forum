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
    render(<FormLogin />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Masuk')).toBeInTheDocument();
  });

  it('Should handle email typing correctly', async () => {
    render(<FormLogin />);
    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'johndoe@gmail.com');

    expect(emailInput).toHaveValue('johndoe@gmail.com');
  });

  it('Should handle password typing correctly', async () => {
    render(<FormLogin />);
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('Should call login function when login button is clicked', async () => {
    loginUser.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(loginUser);

    render(<FormLogin />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Masuk');

    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(submitButton);
    expect(loginUser).toHaveBeenCalledWith({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });

    expect(passwordInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});
