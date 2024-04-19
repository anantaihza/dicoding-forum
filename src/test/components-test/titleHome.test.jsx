import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import TitleHome from '../../view/components/home/TitleHome';

expect.extend(matchers);

describe('Title Home Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    render(<TitleHome />);

    const titleHome = screen.getByText('Diskusi Tersedia');

    expect(titleHome).toBeInTheDocument();
  });
});
