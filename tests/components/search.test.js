import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { userEvent } from '@storybook/testing-library';
import { expect, describe, it } from '@jest/globals';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Search from '../../src/components/products/Search';
import SearchOption from '../../src/components/products/SearchOption';
import InformSearched from '../../src/components/products/InformSearched';
import SearchSuggest from '../../src/components/products/SearchSuggest';
import { getProductList } from '../../src/features/product/getProductsSilice';

const mockStore = configureStore([thunk]);

describe('Search component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      product: {
        productsList: {
          currentPage: 1,
          totalPages: 2,
          rows: [
            {
              id: 1,
              name: 'Product 1',
              images: ['image1.jpg', 'image2.jpg'],
              price: 10,
              quantity: 5,
              productId: 'product1',
            },
            {
              id: 2,
              name: 'Product 2',
              images: ['image1.jpg', 'images2.jpg'],
              price: 20,
              quantity: 10,
              productId: 'product2',
            },
          ],
        },
        isLoading: false,
      },
      getRatings: {
        ratings: null,
        isLoading: false,
      },
    });
  });

  it('should render the search input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    const searchInput = getByPlaceholderText('Search here...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render the search button', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    const searchButton = getByRole('button', { name: 'search' });
    expect(searchButton).toBeInTheDocument();
  });

  it('should render the options click place', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    const optionsButton = getByAltText('options');
    expect(optionsButton).toBeInTheDocument();
  });

  it('should update the input value when typing in the search input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    const searchInput = getByPlaceholderText('Search here...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput.value).toBe('test search');
  });

  it('should call the searchButtonHandler function when the search button is clicked', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    const searchButton = getByRole('button', { name: 'search' });
    fireEvent.click(searchButton);
  });

  it('should render the SearchSuggest component', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchSuggest productName="Product 1" />
        </BrowserRouter>
      </Provider>,
    );
    const searchSuggest = screen.getByTestId('search-suggest');
    expect(searchSuggest).toBeInTheDocument();
  });

  it('should dispatch getProductList action with correct arguments when search button is clicked', () => {
    const { getByRole, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );

    const searchInput = getByTestId('search-input');
    const searchButton = getByRole('button', { name: 'search' });
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    fireEvent.click(searchButton);

    waitFor(() => {
      expect(store.getActions()).toEqual([getProductList({ pageNumber: 1, name: 'Product 1' })]);
    });
    const closInfoBtn = getByTestId('close-btn');
    fireEvent.click(closInfoBtn);
  });

  it('should search clicked product name', () => {
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    const productLink = getByTestId('click-name');
    fireEvent.click(productLink);
  });
});

describe('SearchOption component', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore({
      category: {
        categories: [
          {
            id: 1,
            name: 'Category 1',
          },
          {
            id: 2,
            name: 'Category 2',
          },
        ],
        isLoading: false,
      },
    });
  });

  it('renders the component', () => {
    render(
      <Provider store={store}>
        <SearchOption options={() => {}} />
      </Provider>,
    );

    expect(screen.getByText('Select category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Minimum price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Maximum price')).toBeInTheDocument();
  });
  it('renders message prop correctly', () => {
    const { getByText } = render(<InformSearched message="You have searched for beans" />);
    expect(getByText('You have searched for beans')).toBeInTheDocument();
  });

  it('calls click prop when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<InformSearched click={handleClick} />);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
