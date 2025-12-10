import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SelectInput from '../../src/components/SelectInput';

describe('SelectInput', () => {
  it('renders a label and select element', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    render(
      <SelectInput
        label="Test Select"
        value="1"
        options={options}
        onChange={() => undefined}
      />
    );
    
    const label = screen.getByLabelText('Test Select');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('SELECT');
  });

  it('displays provided options', () => {
    const options = [
      { value: 'A', label: 'Alpha' },
      { value: 'B', label: 'Beta' },
    ];
    render(
      <SelectInput
        label="Letters"
        value="A"
        options={options}
        onChange={() => undefined}
      />
    );
    
    // Check that options are rendered
    expect(screen.getByRole('option', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Beta' })).toBeInTheDocument();
  });

  it('calls onChange when selection changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    const options = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ];
    render(
      <SelectInput
        label="Confirmation"
        value="yes"
        options={options}
        onChange={handleChange}
      />
    );
    
    const select = screen.getByLabelText('Confirmation');
    await user.selectOptions(select, 'no');
    
    expect(handleChange).toHaveBeenCalledWith('no');
  });
});