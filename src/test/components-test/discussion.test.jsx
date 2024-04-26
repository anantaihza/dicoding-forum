import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import Discussion from '../../view/components/common/icon/Discussion';

expect.extend(matchers);

/**
 *
 * SKENARIO TESTING
 *
 * Component: Discussion
 *
 *   - Should renders discussion icon
 *
 */
describe('Discussion Component', () => {
  it('should render correctly', () => {
    // Arrange
    const testCount = 10;
    render(<Discussion count={testCount} />);

    const discussionIcon = screen.getByTestId('discussion-icon');
    const countText = screen.getByText(testCount.toString());

    // Assert
    expect(discussionIcon).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });
});
