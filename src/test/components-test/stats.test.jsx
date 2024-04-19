import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import Stats from '../../view/components/leaderboard/Stats';

expect.extend(matchers);

describe('Stats Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const title = 'Total Score';
    const value = 100;
    const isLoading = false;

    render(<Stats title={title} value={value} isLoading={isLoading} />);

    const titleElement = screen.getByText(title);
    const valueElement = screen.getByText(value.toString());

    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  it('should render loading', () => {
    const title = 'Total Score';
    const value = 100;
    const isLoading = true;

    render(<Stats title={title} value={value} isLoading={isLoading} />);

    const titleElement = screen.getByText(title);
    const valueElement = screen.queryByText(value.toString());

    expect(titleElement).toBeInTheDocument();
    expect(valueElement).not.toBeInTheDocument();
  });
});
