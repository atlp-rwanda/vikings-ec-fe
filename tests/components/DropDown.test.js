import React from 'react';
import DropChildren from '../../src/components/DropDown';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../src/store';

describe('DropChildren', () => {
    test('Dropdown should open when trigger is clicked', () => {
        const { queryAllByRole, queryByText } = render(
          <Provider store={store}>
          <DropChildren toggle={<button>Toggle</button>}>
            <div>Dropdown Content</div>
          </DropChildren></Provider>
        );
      
        const buttons = queryAllByRole('button');
      
        const trigger = buttons.find(button => button.textContent === 'Toggle');
        const dropdownContent = queryByText('Dropdown Content');
      
        expect(dropdownContent).not.toBeVisible();
      
        fireEvent.click(trigger);
      
        expect(dropdownContent).toBeVisible();
      });

      
});