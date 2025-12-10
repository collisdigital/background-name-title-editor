import { render, screen, fireEvent } from '@testing-library/react';
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
    
    const select = screen.getByLabelText('Letters');
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
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
    fireEvent.change(select, { target: { value: 'no' } });
    expect(handleChange).toHaveBeenCalledWith('no');
  });
});
