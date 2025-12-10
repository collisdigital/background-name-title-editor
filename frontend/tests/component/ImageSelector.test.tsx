import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ImageSelector from '../../src/components/ImageSelector';
import { backgrounds } from '../../src/config/backgrounds';

describe('ImageSelector', () => {
  it('renders a list of background images plus the add new button', () => {
    render(<ImageSelector backgrounds={backgrounds} onSelect={() => undefined} />);
    const buttons = screen.getAllByRole('button');
    // +1 for the "Add New" button
    expect(buttons).toHaveLength(backgrounds.length + 1);
  });

  it('calls onSelect with the correct background when clicked', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
    
    // The first button is "Add New", so we click the second one (first background)
    const firstBackgroundBtn = screen.getAllByRole('button')[1];
    await user.click(firstBackgroundBtn);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(backgrounds[0]);
  });

  it('indicates the selected state correctly', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
    
    const firstBackgroundBtn = screen.getAllByRole('button')[1];
    
    // Initially not pressed
    expect(firstBackgroundBtn).toHaveAttribute('aria-pressed', 'false');
    
    await user.click(firstBackgroundBtn);
    
    // Should be pressed after click
    expect(firstBackgroundBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('allows uploading a custom background', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    // Mock URL.createObjectURL
    const mockUrl = 'blob:http://localhost:3000/mock-uuid';
    global.URL.createObjectURL = vi.fn(() => mockUrl);

    render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
    
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('file-upload');
    
    await user.upload(input, file);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    // Verify the called object has the correct properties
    const selectedBg = handleSelect.mock.calls[0][0];
    expect(selectedBg.src).toBe(mockUrl);
    expect(selectedBg.name).toBe('chucknorris.png');
    expect(selectedBg.id).toContain('user-upload-');
  });
});