import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getMessage from '../features/actions/welcomeAction';
import ProductCard from '../components/products/ProductCard';
import { getProductList } from '../features/product/getProductsSilice';
import ProductOperationButton from '../components/products/ProductOperationButton';
import wishIcon from '../../public/images/wish.svg';
import HoveredShopIcon from '../../public/images/shoping.svg';
import shopIcon from '../../public/images/black-add-cart.svg';
import hoveredHurt from '../../public/images/hoveredHurt.svg';
import PageCount from '../components/products/PageCount';
import Loader from '../components/Loader';
import { showErrorMessage } from '../utils/toast';
import Modal from '../components/Modal';
import SetCartQuantity from '../components/cart/SetCartQuantity';

const HomePage = () => {
  const dispatch = useDispatch();
  const { productsList, isLoading, errorMessage } = useSelector((state) => state.product);
  const [hover, setHover] = useState(false);
  const [hoverAddCart, setHoverAddCart] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleAddTocartMouseEnter = () => {
    setHoverAddCart(true);
  };
  const handleAddTocartMouseLeave = () => {
    setHoverAddCart(false);
  };
  useEffect(() => {
    dispatch(getMessage());
    dispatch(getProductList({ pageNumber: 1 }));
  }, [dispatch]);

  const productNotFound = true
    ? (!isLoading && Array.isArray(productsList.rows) && productsList.rows.length === 0) : false;

  if (errorMessage) {
    showErrorMessage(errorMessage.data.error);
    setTimeout(() => {
      dispatch({ type: 'product/resetErrorMessage' });
    }, 5000);
  }

  const setPageNumberHandler = (nextPage) => {
    const newPageNumber = nextPage
      ? parseInt(productsList.currentPage) + 1
      : parseInt(productsList.currentPage) - 1;
    if (newPageNumber > 0 && newPageNumber <= productsList.totalPages) {
      dispatch(
        getProductList({
          pageNumber: newPageNumber,
        }),
      );
    }
  };

  let viewProducts = null;
  let pageCount = null;
  if (Array.isArray(productsList.rows) && productsList.rows.length > 0) {
    viewProducts = productsList.rows.map((row) => {
      let setPersistCart;
      return (
        <ProductCard
          key={row.id}
          getPersistCartSetter={(persistCart) => {
            setPersistCart = persistCart;
          }}
          product={row}
          wish={(
            <ProductOperationButton
              className="mt-[20px] bg-[#f6f4f4] h-[32px] hover:bg-[#099f09] w-[32px] rounded-full flex justify-center items-center"
              icon={hover ? hoveredHurt : wishIcon}
              title="Wish product"
              alt="wish"
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          )}
          addCart={(
            <Modal
              header={(
                <h2 className="text-2xl mx-auto text-[#64B937]">
                  Confirm to add &nbsp;
                  {row.name}
                  &nbsp;in the cart
                </h2>
              )}
              notifyOnClose={() => {
                if (setPersistCart) {
                  setPersistCart(false);
                }
              }}
              notifyOnOpen={() => {
                if (setPersistCart) {
                  setPersistCart(true);
                }
              }}
              toggle={(
                <ProductOperationButton
                  className="mt-[20px] bg-[#f6f4f4] hover:bg-[#099f09] h-[32px] w-[32px] rounded-full flex justify-center items-center "
                  icon={hoverAddCart ? HoveredShopIcon : shopIcon}
                  title="Shop product"
                  testId="add-to-cart"
                  alt="shop"
                  handleMouseEnter={handleAddTocartMouseEnter}
                  handleMouseLeave={handleAddTocartMouseLeave}
                />
              )}
            >
              <SetCartQuantity
                quantity={row.quantity}
                price={row.price}
                id={row.id}
                name={row.name}
              />
            </Modal>
          )}
        />
      );
    });
    pageCount = (
      <PageCount
        className=""
        currentPage={productsList.currentPage}
        totalPages={productsList.totalPages}
        click={setPageNumberHandler}
      />
    );
  }

  return (
    <div className="min-h-72">
      <h1 className="pb-8 text-center pt-8 font-bold text-[25px] text-gray-600">OUR PRODUCTS</h1>
      {isLoading ? <Loader />
        : (
          <div className="px-10 md:px-24 xl:px-60 xs:px-2 grid md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1 gap-10">
            {!productNotFound ? viewProducts : <p className="text-gray-600 flex justify-center items-center w-full col-span-4 font-bold ">Product not found</p>}
          </div>
        )}
      <br />
      <div className="pb-4">{!isLoading ? pageCount : null}</div>
    </div>
  );
};

export default HomePage;
