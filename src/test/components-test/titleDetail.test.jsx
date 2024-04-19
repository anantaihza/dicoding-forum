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
    getTimeAgo: vi.fn().mockReturnValue('2 hari lalu'),
  };
});

describe('Title Detail', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should renders category badge with correct content', () => {
    const mockDataDetail = {
      category: 'Technology',
      title: 'The Future of AI',
      createdAt: new Date('2024-04-18T00:00:00.000Z'),
      owner: { name: 'John Doe' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const categoryBadge = screen.getByText('#Technology');
    expect(categoryBadge).toBeInTheDocument();
  });

  it('should renders thread title', () => {
    const mockDataDetail = {
      category: 'Science',
      title: 'Exploring the Universe',
      createdAt: new Date('2024-04-16T00:00:00.000Z'),
      owner: { name: 'Jane Doe' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const threadTitle = screen.getByText('Exploring the Universe');
    expect(threadTitle).toBeInTheDocument();
  });

  it('should renders time ago', () => {
    const mockDataDetail = {
      category: 'Art',
      title: 'The Power of Creativity',
      createdAt: new Date('2024-04-15T00:00:00.000Z'),
      owner: { name: 'Alice Smith' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const timeAgo = screen.getByText('4 hari lalu');
    expect(timeAgo).toBeInTheDocument();
  });

  it('should renders owner name', () => {
    const mockDataDetail = {
      category: 'History',
      title: 'Lessons from the Past',
      createdAt: new Date('2024-04-14T00:00:00.000Z'),
      owner: { name: 'Bob Brown' },
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<TitleDetail />);

    const ownerName = screen.getByText('Bob Brown');
    expect(ownerName).toBeInTheDocument();
  });

  it('should handle missing data', () => {
    useSelector.mockReturnValueOnce({ dataDetail: {} });

    render(<TitleDetail />);

    const categoryBadge = screen.queryByText('#Technology');
    const threadTitle = screen.queryByText('Exploring the Universe');

    expect(categoryBadge).not.toBeInTheDocument();
    expect(threadTitle).not.toBeInTheDocument();
  });
});
