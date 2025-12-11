import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ImageSelector from '../../src/components/ImageSelector';
import { backgrounds } from '../../src/config/backgrounds';

describe('ImageSelector', () => {
  afterEach(() => {
    cleanup();
    // Reset URL
    window.history.pushState({}, '', '/');
  });

  describe('Default Mode (No Debug)', () => {
    it('renders a list of background images without the add new button', () => {
      render(<ImageSelector backgrounds={backgrounds} onSelect={() => undefined} />);
      const buttons = screen.getAllByRole('button');
      // No "Add New" button
      expect(buttons).toHaveLength(backgrounds.length);
      expect(screen.queryByLabelText('Upload custom background')).not.toBeInTheDocument();
    });

    it('calls onSelect with the correct background when clicked', async () => {
      const handleSelect = vi.fn();
      const user = userEvent.setup();
      
      render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
      
      // The first button is the first background
      const firstBackgroundBtn = screen.getAllByRole('button')[0];
      await user.click(firstBackgroundBtn);

      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith(backgrounds[0]);
    });

    it('indicates the selected state correctly', async () => {
      const handleSelect = vi.fn();
      const user = userEvent.setup();
      
      render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
      
      const firstBackgroundBtn = screen.getAllByRole('button')[0];
      
      // Initially not pressed
      expect(firstBackgroundBtn).toHaveAttribute('aria-pressed', 'false');
      
      await user.click(firstBackgroundBtn);
      
      // Should be pressed after click
      expect(firstBackgroundBtn).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Debug Mode', () => {
    it('shows add button and allows uploading a custom background', async () => {
      // Enable debug mode
      window.history.pushState({}, '', '/?debug=true');

      const handleSelect = vi.fn();
      const user = userEvent.setup();
      
      // Mock URL.createObjectURL
      const mockUrl = 'blob:http://localhost:3000/mock-uuid';
      global.URL.createObjectURL = vi.fn(() => mockUrl);

      render(<ImageSelector backgrounds={backgrounds} onSelect={handleSelect} />);
      
      // Check for Add New button
      const addButton = screen.getByLabelText('Upload custom background');
      expect(addButton).toBeInTheDocument();

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
});
