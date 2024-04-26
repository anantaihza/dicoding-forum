import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import ScoreBoard from '../../view/components/leaderboard/ScoreBoard';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

/**
 *
 * SKENARIO TESTING
 *
 * Component: ScoreBoard
 *
 *  - Should renders Title correctly
 *  - Should renders header table correctly
 *  - Should renders avatar table correctly
 *
 */
describe('ScoreBoard Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useSelector.mockReturnValue({
      listBoard: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url1.jpg',
          },
          score: 10,
        },
        {
          user: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url2.jpg',
          },
          score: 5,
        },
      ],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Should renders Title correctly', () => {
    // Arrange
    render(<ScoreBoard />);

    const title = screen.getByText('Klansemen Pengguna Aktif');

    // Assert
    expect(title).toBeInTheDocument();
  });

  it('Should renders header table correctly', () => {
    // Arrange
    render(<ScoreBoard />);

    const headers = screen.getAllByRole('columnheader');

    // Assert
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent('No');
    expect(headers[1]).toHaveTextContent('Pengguna');
    expect(headers[2]).toHaveTextContent('Skor');
  });

  it('Should renders avatar table correctly', () => {
    // Arrange
    render(<ScoreBoard />);

    const avatarImg1 = screen.getByAltText('John Doe');
    const avatarImg2 = screen.getByAltText('Jane Doe');

    // Assert
    expect(avatarImg1).toHaveAttribute(
      'src',
      'https://generated-image-url1.jpg'
    );
    expect(avatarImg2).toHaveAttribute(
      'src',
      'https://generated-image-url2.jpg'
    );
  });
});
