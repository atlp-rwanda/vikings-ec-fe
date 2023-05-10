import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
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
import { showSuccessMessage, showErrorMessage } from '../utils/toast';
import Modal from '../components/Modal';
import SetCartQuantity from '../components/cart/SetCartQuantity';
import ChatIcon from '../../public/images/icons/comment.svg';
import Chat from '../components/chat/chats';
import getUserInfo from '../utils/getUserInfo';
import { addToWishlist } from '../features/wishlist/wishlistslice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { productsList, isLoading, errorMessage } = useSelector((state) => state.product);
  const [hover, setHover] = useState(false);
  const [hoverAddCart, setHoverAddCart] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showChatButton, setShowChatButton] = useState(true);
  const { data: addToCartData } = useSelector((state) => state.addToCart);

  const room = 'chatbot';
  const user = getUserInfo();

  const socket = io.connect('https://vikings-ec-bn-mbhd.onrender.com');
  socket.emit('join_room', room);

  const handleChatButtonClick = () => {
    setShowChats(false);
    setShowChatButton(true);
  };

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

  const addWishlist = async (productId) => {
    try {
      const response = await dispatch(addToWishlist({
        productId}
        )).unwrap();
      showSuccessMessage('Product added successfully');
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };
  const productNotFound = true
    ? (!isLoading && Array.isArray(productsList.rows) && productsList.rows.length === 0) : false;

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
            onClick={() => {addWishlist(row.id)}}
              className="mt-[20px] bg-[#f6f4f4] h-[32px] hover:bg-[#099f09] w-[32px] rounded-full flex justify-center items-center"
              icon={hover ? hoveredHurt : wishIcon}
              title="Wish product"
            />
          )}
          addCart={(
            <Modal
              forceCloseOnChange={addToCartData}
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
                  className={`mt-[20px] bg-[#f6f4f4] hover:bg-[#099f09] h-[32px] w-[32px] rounded-full flex justify-center items-center ${row.isAvailable ? '' : 'hover:bg-[#D9F2D9]'}`}
                  icon={hoverAddCart ? HoveredShopIcon : shopIcon}
                  title={row.isAvailable ? 'Shop product' : 'Product is not available'}
                  testId="add-to-cart"
                  alt="shop"
                  disabled={!row.isAvailable}
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
      <Chat
        onClose={handleChatButtonClick}
        visible={showChats}
        socket={socket}
        room={room}
        user={user}
      />
      <h1 className="pb-8 text-center pt-8 font-bold text-[25px] text-gray-600">
        OUR PRODUCTS
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="px-10 md:px-24 xl:px-60 xs:px-2 grid md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1 gap-10"
        >
          {!productNotFound ? (
            viewProducts
          ) : (
            <p className="text-gray-600 flex justify-center items-center w-full col-span-4 font-bold ">
              Product not found
            </p>
          )}
        </div>
      )}
      <br />
      <div className="pb-4">{!isLoading ? pageCount : null}</div>
      <div>
        <button
          onClick={() => {
            setShowChats(true);
            setShowChatButton(false);
          }}
          type="submit"
          className={`w-[50px] h-[50px] rounded-l-[25px] rounded-tr-[25px] fixed bottom-[80px] right-[50px] z-10 bg-[#ABEC89] hover:bg-[#099f09] px-[12px] comment ${showChatButton ? '' : 'hidden'
          }`}
        >
          <img src={ChatIcon} alt="Send Icon" className=" mx-auto " />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
