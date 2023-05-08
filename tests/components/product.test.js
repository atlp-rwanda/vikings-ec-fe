import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { expect, describe, it } from '@jest/globals';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import axiosMock from 'axios';
import BuyerViewSingleProduct from '../../src/components/products/BuyerViewSingleProduct';
import PageCount from '../../src/components/products/PageCount';
import ProductOperationButton from '../../src/components/products/ProductOperationButton';
import SwitchImages from '../../src/components/products/SwitchImages';
import productCardMock, {
  mockProductsWithWishBtn,
} from '../mocks/products/product.mock';
import ProductCard from '../../src/components/products/ProductCard';
import SellerViewSingleProduct from '../../src/components/products/SellerViewSingleProduct';
import Products from '../../src/pages/dashboard/Products';
import SingProductPage from '../../src/pages/SingleProductPage';
import HomePage from '../../src/pages/HomePage';
import { getProductList } from '../../src/features/product/getProductsSilice';
import getMessage from '../../src/features/actions/welcomeAction';
import Reviewers from '../../src/components/products/Reviewers';
import ProductRatings from '../../src/components/products/ProductRatings';
import st from '../../src/store';

describe('ProductCard', () => {
  it('should render recommended products', () => {
    const { getByText } = render(
      <Provider store={st}>
        <MemoryRouter>
          <SingProductPage />
        </MemoryRouter>
      </Provider>
    );
    expect(getByText('Recommended For You')).toBeInTheDocument();
  });
  it('should render product card with correct props', () => {
    render(<ProductCard {...productCardMock} />);
    expect(screen.getByAltText('product')).toBeInTheDocument();
    expect(screen.getByText('product name')).toBeInTheDocument();
    expect(screen.getByText('100 RWF')).toBeInTheDocument();
  });

  it('should call viewSingleProduct when clicking on product name', () => {
    render(<ProductCard {...productCardMock} />);
    const clickName = screen.getByTestId('product-name');
    clickName.click();
    expect(productCardMock.viewSingleProduct).toHaveBeenCalledWith(
      'product name',
      'product-image.jpg',
      100,
      1,
      '12345',
      2000,
      true
    );
  });

  it('should call window location for single product', () => {
    render(<ProductCard {...mockProductsWithWishBtn} />);
    const productName = screen.getByText('product name');
    const clickName = screen.getByTestId('product-name');
    clickName.click();
    expect(productName).toBeInTheDocument();
  });

  it('should set hovered state', () => {
    const { getByTestId } = render(<ProductCard {...productCardMock} />);
    const cardElement = getByTestId('product-card');
    fireEvent.mouseEnter(cardElement);
    fireEvent.mouseLeave(cardElement);
    const productName = screen.getByText('product name');
    expect(productName).toBeInTheDocument();
  });
});

describe('DashboardPage', () => {
  const mockStore = configureStore([thunk]);
  it('should render loading spinner when isLoading is true', () => {
    const isLoading = true;
    const productsList = [];
    const initialState = { product: { productsList, isLoading } };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Products isLoading={isLoading} products={[]} />
        </BrowserRouter>
      </Provider>,
    );
  });
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({
    search: '?id=1',
  }),
}));

describe('SingProductPage', () => {
  const mockStore = configureStore({})({
    singleProduct: {
      product: {
        name: 'Test Product',
        price: 100,
        images: ['image1.jpg', 'image2.jpg'],
      },
      isLoading: false,
    },
    getRatings: {
      ratings: null,
      isLoading: false,
    },
    provideRatings: {},
    recommendedProducts: {
      products: null,
      isLoading: false,
    },
    product: {
      productList: {},
      isLoading: false,
    },
  });
  it('should render SingProductPage component correctly', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <SingProductPage />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('BuyerViewSingleProduct', () => {
  const product = {
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    fullImage: 0,
    name: 'Product Name',
    price: 100,
  };

  it('renders product details correctly', () => {
    const mockStore = configureStore({})({
      singleProduct: {
        product: {
          name: 'Test Product',
          price: 100,
          images: ['image1.jpg', 'image2.jpg'],
        },
        isLoading: false,
      },
      getRatings: {
        ratings: null,
        isLoading: false,
      },
      provideRatings: {
        isLoading: false,
      },
    });
    const { getByText } = render(
      <Provider store={mockStore}>
        <BuyerViewSingleProduct products={product} />
      </Provider>,
    );
    expect(getByText('Product Name')).toBeInTheDocument();
    expect(getByText('100 RWF')).toBeInTheDocument();
  });
});

describe('PageCount', () => {
  const defaultProps = {
    className: 'test-class',
    currentPage: 1,
    totalPages: 10,
    click: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shoud render PageCount correctly', () => {
    const { getByAltText } = render(<PageCount {...defaultProps} />);
    expect(getByAltText('previous page')).toBeInTheDocument();
  });

  it('calls click function with true when next page button is clicked', () => {
    const { getByText } = render(<PageCount {...defaultProps} />);
    const nextButton = getByText('Next page');
    fireEvent.click(nextButton);
    expect(defaultProps.click).toHaveBeenCalledWith(true);
  });

  it('calls click function with false when previous page button is clicked', () => {
    const { getByAltText } = render(<PageCount {...defaultProps} />);

    const prevButton = getByAltText('previous page');
    fireEvent.click(prevButton);
    expect(defaultProps.click).toHaveBeenCalledWith(false);
  });
  it('calls click function with false when next arrow button is clicked', () => {
    const { getByAltText } = render(<PageCount {...defaultProps} />);

    const nextButton = getByAltText('next-page');
    fireEvent.click(nextButton);
    expect(defaultProps.click).toHaveBeenCalledWith(true);
    expect(getByAltText('next-page')).toBeInTheDocument();
  });
});

describe('ProductOperationButton', () => {
  const defaultProps = {
    className: 'test-class',
    title: 'Test Title',
    handleMouseEnter: jest.fn(),
    handleMouseLeave: jest.fn(),
    icon: 'test-icon.png',
    alt: 'Test Alt',
    size: 'test-size',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render roductOperationButton  correctly', () => {
    const { getByRole, getByAltText } = render(
      <ProductOperationButton {...defaultProps} />,
    );

    const buttonElement = getByRole('button');
    const iconElement = getByAltText('Test Alt');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('test-class');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });
});

describe('SellerViewSingleProduct', () => {
  const product = {
    image: 'product-image.jpg',
    name: 'Example Product',
    price: 100,
    quantity: 10,
  };
});

describe('SwitchImages', () => {
  const props = {
    className: 'switch-images-container',
    switchCurrentImage: jest.fn(),
  };

  it('should render left and right buttons with correct props', () => {
    const { getByTestId } = render(<SwitchImages {...props} />);

    const leftButton = getByTestId('left-button');
    const rightButton = getByTestId('right-button');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();

    fireEvent.click(leftButton);
    expect(props.switchCurrentImage).toHaveBeenCalledWith(false);

    fireEvent.click(rightButton);
    expect(props.switchCurrentImage).toHaveBeenCalledWith(true);
  });
});

const mockStore = configureStore([thunk]);

describe('HomePage Component', () => {
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
              price: 100,
              quantity: 3,
            },
          ],
        },
        isLoading: false,
      },
      message: {
        data: { message: 'Welcome to the homepage' },
      },
      googleAuth: {
        data: { user: { id: 1, name: 'User' } },
      },
      getMessages: { isLoading: false, messages: [] },
      sendMessage: { isLoading: false },
    });
  });

  it('should render product cards when products are available', () => {
    store.dispatch(getMessage());
    store.dispatch(getProductList({ pageNumber: 1 }));
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    const productCard = screen.getByText('Product 1');
    fireEvent.mouseEnter(productCard);
    expect(productCard).toHaveClass(
      'text-indigo-900 text-[20px] mt-3 cursor-pointer hover:text-[#099f09]',
    );
    expect(getByText('Product 1')).toBeInTheDocument();
  });

  it('should render HomePage', () => {
    store.getState().product.isLoading = true;
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
  });
});

const mockStore2 = configureStore([thunk]);
const store = mockStore2({
  markProduct: {
    data: null,
    isLoading: false
  },
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

describe('DashboardPage', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render the product cards on dashboard', () => {
    const product1Name = screen.getByText('Product 1');
    const product2Name = screen.getByText('Product 2');

    expect(product1Name).toBeInTheDocument();
    expect(product2Name).toBeInTheDocument();
  });

  it('sets selected product and product clicked state', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>,
    );
    const product1Names = getAllByText('Product 1');
    fireEvent.click(product1Names[0]);
  });

  it('should change page number and dispatches getProductList with correct page number', () => {
    const dispatchMock = jest.fn();
    const getProductListMock = jest.fn();
    const productsList = {
      currentPage: 1,
      totalPages: 5,
    };
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Products dispatch={dispatchMock} getProductList={getProductListMock} productsList={productsList} />
        </BrowserRouter>
      </Provider>,
    );
    const testId = getAllByTestId('next-page');
    fireEvent.click(testId[0]);
    expect(productsList.currentPage).toBe(1);
  });
});

describe('Reviewers component', () => {
  const reviewer = {
    feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buyer: {
      firstname: 'John',
      lastname: 'Doe',
      avatar: 'http://example.com/avatar.png',
    },
  };

  it('renders the reviewer name', () => {
    const { getByText } = render(<Reviewers reviewer={reviewer} />);
    expect(
      getByText(`${reviewer.buyer.firstname} ${reviewer.buyer.lastname}`)
    ).toBeInTheDocument();
  });

  it('renders the reviewer feedback', () => {
    const { getByText } = render(<Reviewers reviewer={reviewer} />);
    expect(getByText(reviewer.feedback)).toBeInTheDocument();
  });

  it('renders the reviewer avatar when provided', () => {
    const { getByAltText } = render(<Reviewers reviewer={reviewer} />);
    expect(getByAltText('profile')).toHaveAttribute(
      'src',
      reviewer.buyer.avatar
    );
  });
});

describe('ProductRatings component', () => {
  const ratings = [
    { ratings: 1 },
    { ratings: 3 },
    { ratings: 5 },
    { ratings: 4 },
    { ratings: 5 },
    { ratings: 2 },
    { ratings: 4 },
  ];

  it('renders the correct number of stars for the average rating', () => {
    const { container } = render(<ProductRatings rate={ratings} />);
    const stars = container.querySelectorAll('img');
    expect(stars).toHaveLength(5);
  });
});
