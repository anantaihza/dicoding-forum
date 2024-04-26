import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import TitleHome from '../../view/components/home/TitleHome';

expect.extend(matchers);

/**
 *
 * SKENARIO TESTING
 *
 * Component: TitleHome
 *
 *   - Should renders correctly
 */
describe('Title Home Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render correctly', () => {
    // Arrange
    render(<TitleHome />);

    const titleHome = screen.getByText('Diskusi Tersedia');

    // Assert
    expect(titleHome).toBeInTheDocument();
  });
});
