import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PreviewCanvas from '../../src/components/PreviewCanvas';

describe('PreviewCanvas', () => {
  it('renders a canvas element', () => {
    render(<PreviewCanvas />);
    const canvas = screen.getByRole('presentation');
    expect(canvas).toBeInTheDocument();
  });
});
