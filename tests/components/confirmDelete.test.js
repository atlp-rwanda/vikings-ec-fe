import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ConfirmDelete from '../../src/components/ConfirmDelete';
import '@testing-library/jest-dom/extend-expect';

describe('ConfirmDelete', () => {
  const props = {
    showModel: true,
    isLoading: false,
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    setShowModel: jest.fn(),
    onClick: jest.fn(),
  };

  it('renders the title and message', () => {
    const { getByText } = render(<ConfirmDelete {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.message)).toBeInTheDocument();
  });

  it('calls the onClick function when delete button is clicked', () => {
    const { getByText } = render(<ConfirmDelete {...props} />);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('hides the modal when cancel button is clicked', () => {
    const { getByText } = render(<ConfirmDelete {...props} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(props.setShowModel).toHaveBeenCalledWith(false);
  });

  it('does not render the modal when showModel is false', () => {
    const { queryByTestId } = render(
      <ConfirmDelete {...props} showModel={false} />
    );
    expect(queryByTestId('modal')).not.toBeInTheDocument();
  });
});
