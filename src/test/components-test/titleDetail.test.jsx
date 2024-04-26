import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import * as matchers from '@testing-library/jest-dom/matchers';
import TitleDetail from '../../view/components/detail/TitleDetail';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../../utils/timeAgo', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getTimeAgo: vi.fn(),
    // getTimeAgo: vi.fn().mockReturnValue('2 hari lalu'),
  };
});

/**
 *
 * SKENARIO TESTING
 *
 * Component: TitleDetail
 *
 *  - Should renders category badge with correct content
 *  - Should renders thread title
 *  - Should renders owner name
 *  - Should handle missing data
 *
 */
describe('Title Detail', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Should renders category badge with correct content', () => {
    // Arrange
    const mockDataDetail = {
      category: 'Technology',
      title: 'The Future of AI',
      createdAt: new Date('2024-04-18T00:00:00.000Z'),
      owner: { name: 'John Doe' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const categoryBadge = screen.getByText('#Technology');

    // Assert
    expect(categoryBadge).toBeInTheDocument();
  });

  it('Should renders thread title', () => {
    // Arrange
    const mockDataDetail = {
      category: 'Science',
      title: 'Exploring the Universe',
      createdAt: new Date('2024-04-16T00:00:00.000Z'),
      owner: { name: 'Jane Doe' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const threadTitle = screen.getByText('Exploring the Universe');

    // Assert
    expect(threadTitle).toBeInTheDocument();
  });

  it('Should renders owner name', () => {
    // Arrange
    const mockDataDetail = {
      category: 'History',
      title: 'Lessons from the Past',
      createdAt: new Date('2024-04-14T00:00:00.000Z'),
      owner: { name: 'Bob Brown' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const ownerName = screen.getByText('Bob Brown');

    // Assert
    expect(ownerName).toBeInTheDocument();
  });

  it('Should handle missing data', () => {
    // Arrange
    useSelector.mockReturnValueOnce({ dataDetail: {} });

    render(<TitleDetail />);

    const categoryBadge = screen.queryByText('#Technology');
    const threadTitle = screen.queryByText('Exploring the Universe');

    // Assert
    expect(categoryBadge).not.toBeInTheDocument();
    expect(threadTitle).not.toBeInTheDocument();
  });
});
