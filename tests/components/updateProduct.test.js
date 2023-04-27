import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, describe, test } from '@jest/globals';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { userEvent } from '@storybook/testing-library';
import store from '../../src/store';
import UpdateProductForm from '../../src/components/products/updateProduct';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SelectBox from '../../src/components/forms/select';

window.URL.createObjectURL = jest.fn();
const mockStore = configureStore([thunk]);
let stor;

describe('Update product', () => {
  test('should render spinner', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UpdateProductForm />
        </Router>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeDefined();
    });
  });
  stor = mockStore({
    singleProduct: {
      ui: {
        avatar: null,
      },
    },
    category: {
      ui: {
        avatar: null,
      },
    },
    updateProduct: {
      ui: {
        avatar: null,
      },
    },
  });
  window.URL.createObjectURL = jest.fn();
  test('should render product form', () => {
    render(
      <Provider store={stor}>
        <Router>
          <UpdateProductForm />
        </Router>
      </Provider>
    );
    const inputElement = screen.getByRole('update-product-form');
    expect(inputElement).toBeDefined();
  });

  test(`Should fire change event on file upload`, async () => {
    render(
      <Provider store={stor}>
        <Router>
          <UpdateProductForm />
        </Router>
      </Provider>
    );

    const testImageFile = new File(['hello'], 'hello.png', {
      type: 'image/png',
    });
    const fileInput = screen.getByTestId('upload-image-input');
    const saveButton = screen.getByRole('button', { label: /Save Changes/i });
    await userEvent.click(saveButton);

    expect(fileInput.files.length).toBe(0);
    await userEvent.upload(fileInput, testImageFile);
    expect(fileInput.files.length).toBe(1);
  });
  test('select option', () => {
    const { getByRole, getAllByTestId } = render(
      <SelectBox
        label="Category"
        options={[
          { id: 'clothes', name: 'Clothes' },
          { id: 'shoes', name: 'Shoes' },
        ]}
      />
    );

    fireEvent.click(getByRole('combobox'), { target: { value: 2 } });
    const options = getAllByTestId('select-btn');
    expect(options[1].selected).toBeFalsy();
  });
});
