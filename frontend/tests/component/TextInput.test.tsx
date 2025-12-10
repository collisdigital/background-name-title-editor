import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TextInput from '../../src/components/TextInput';

describe('TextInput', () => {
  it('renders an input field with the correct label and value', () => {
    render(<TextInput label="Name" value="Initial Value" onChange={() => undefined} />);
    
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Initial Value');
  });

  it('calls onChange callback when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<TextInput label="Name" value="" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Name');
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveBeenCalledWith('H'); // Note: controlled input tests with simple mocks often only capture the last char per call in simple setups, but verifying call count is good.
    // Actually, controlled inputs in tests need the parent to update the value prop to reflect changes fully, 
    // but verifying the callback is fired is sufficient for the component test.
  });
});