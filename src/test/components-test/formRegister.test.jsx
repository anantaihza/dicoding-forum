import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useDispatch, useSelector } from 'react-redux';
import FormRegister from '../../view/components/register/FormRegister';
import { registerUser } from '../../redux/features/auth/authThunk';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: vi.fn(),
}));

vi.mock('../../redux/features/auth/authThunk', () => ({
  registerUser: vi.fn(),
}));

/**
 *
 * SKENARIO TESTING
 *
 * Component: FormRegister
 *
 *   - Should render correctly
 *   - Should handle name typing correctly
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should handle retype password typing correctly
 *   - Should call register function when register button is clicked
 *
 */
describe('Form Register', () => {
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
    render(<FormRegister />);

    // Assert
    expect(screen.getByPlaceholderText('Nama')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Retype password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('Should handle name typing correctly', async () => {
    // Arrange
    render(<FormRegister />);
    const nameInput = screen.getByPlaceholderText('Nama');

    // Action
    await userEvent.type(nameInput, 'John Doe');

    // Assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('Should handle email typing correctly', async () => {
    // Arrange
    render(<FormRegister />);
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'johndoe@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('johndoe@gmail.com');
  });

  it('Should handle password typing correctly', async () => {
    // Arrange
    render(<FormRegister />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'password');

    // Assert
    expect(passwordInput).toHaveValue('password');
  });

  it('Should handle retype password typing correctly', async () => {
    // Arrange
    render(<FormRegister />);
    const retypePasswordInput = screen.getByPlaceholderText('Retype password');

    // Action
    await userEvent.type(retypePasswordInput, 'password');

    // Assert
    expect(retypePasswordInput).toHaveValue('password');
  });

  it('Should call register function when register button is clicked', async () => {
    // Arrange
    registerUser.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(registerUser);

    render(<FormRegister />);

    const nameInput = screen.getByPlaceholderText('Nama');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const retypePasswordInput = screen.getByPlaceholderText('Retype password');
    const submitButton = screen.getByText('Register');

    // Action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(retypePasswordInput, 'password123');
    await userEvent.click(submitButton);

    // Assert
    expect(registerUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password123',
    });

    expect(emailInput).toHaveValue('');
    expect(nameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(retypePasswordInput).toHaveValue('');
  });
});
