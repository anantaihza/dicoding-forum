import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeEach, describe, it, expect, vi, afterEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../utils/api/userAPI';
import Navbar from '../../view/components/common/Navbar';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  // eslint-disable-next-line react/prop-types, react/jsx-props-no-spreading
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

vi.mock('../../utils/api/userAPI', () => ({
  getAccessToken: vi.fn(),
  removeAccessToken: vi.fn(),
}));

/**
 *
 * SKENARIO TESTING
 *
 * Component: Navbar
 *
 *   - Should render correctly when user is not logged in
 *   - Should render correctly when user is logged in
 *   - Should handle logout correctly
 *
 */
describe('Navbar Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useSelector.mockReturnValue({
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    });

    // Mock window.location.reload
    delete window.location;
    window.location = { ...window.location, reload: vi.fn() };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    cleanup();
  });

  it('Should render correctly when user is not logged in', () => {
    // Arrange
    getAccessToken.mockReturnValue(null);
    render(<Navbar />);

    const threadsLinks = screen.getAllByText('Threads');
    const leaderboardLinks = screen.getAllByText('Leaderboard');

    // Assert
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    threadsLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
    leaderboardLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('Should render correctly when user is logged in', () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    render(<Navbar />);

    // Assert
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('Should handle logout correctly', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');
    render(<Navbar />);

    const logoutButton = screen.getByText('Logout');

    // Action
    await userEvent.click(logoutButton);
    getAccessToken.mockReturnValue(null);

    // Assert
    expect(getAccessToken()).toBe(null);
    expect(window.location.reload).toHaveBeenCalledTimes(1);

    render(<Navbar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
