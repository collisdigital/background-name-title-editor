import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ImageSelector from '../../src/components/ImageSelector';
import { backgrounds } from '../../src/config/backgrounds';

describe('ImageSelector', () => {
  it('renders a list of background images', () => {
    render(<ImageSelector backgrounds={backgrounds} onSelect={() => undefined} />);
    const images = screen.getAllByRole('button');
    expect(images).toHaveLength(backgrounds.length);
  });

  it('calls onSelect with the correct background when clicked', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
    
    const firstButton = screen.getAllByRole('button')[0];
    await user.click(firstButton);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(backgrounds[0]);
  });

  it('indicates the selected state correctly', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
    
    const firstButton = screen.getAllByRole('button')[0];
    
    // Initially not pressed
    expect(firstButton).toHaveAttribute('aria-pressed', 'false');
    
    await user.click(firstButton);
    
    // Should be pressed after click
    expect(firstButton).toHaveAttribute('aria-pressed', 'true');
  });
});