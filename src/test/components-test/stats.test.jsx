import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import Stats from '../../view/components/leaderboard/Stats';

expect.extend(matchers);

/**
 *
 * SKENARIO TESTING
 *
 * Component: Stats
 *
 *  - Should render correctly
 *  - Should render loading
 *
 */
describe('Stats Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render correctly', () => {
    // Arrange
    const title = 'Total Score';
    const value = 100;
    const isLoading = false;

    render(<Stats title={title} value={value} isLoading={isLoading} />);

    const titleElement = screen.getByText(title);
    const valueElement = screen.getByText(value.toString());

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  it('Should render loading', () => {
    // Arrange
    const title = 'Total Score';
    const value = 100;
    const isLoading = true;

    render(<Stats title={title} value={value} isLoading={isLoading} />);

    const titleElement = screen.getByText(title);
    const valueElement = screen.queryByText(value.toString());

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(valueElement).not.toBeInTheDocument();
  });
});
