import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import * as matchers from '@testing-library/jest-dom/matchers';
import ContentDetail from '../../view/components/detail/ContentDetail';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('html-react-parser', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    parser: vi.fn().mockReturnValue(
      <p>
        This is some <b>bold</b> and <i>italic</i> content.
      </p>
    ),
  };
});

describe('Content Detail', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should renders parsed content from body', () => {
    const mockDataDetail = {
      body: 'This is some <b>bold</b> and <i>italic</i> content.',
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<ContentDetail />);

    const content = screen.getByTestId('content-detail');

    expect(content).toBeInTheDocument();
  });

  it('Empty render body is null or undefined', () => {
    const mockDataDetail = {
      body: null,
    };
    useSelector.mockReturnValueOnce({ dataDetail: mockDataDetail });

    render(<ContentDetail />);

    const content = screen.getByTestId('content-detail');

    expect(content).toBeEmptyDOMElement();
  });
});
