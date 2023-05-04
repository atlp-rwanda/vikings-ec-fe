import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singleProduct } from '../features/product/singleProductSlice';
import BuyerViewProduct from '../components/products/BuyerViewSingleProduct';
import SwitchImages from '../components/products/SwitchImages';
import switchCurrentImagesUtil from '../utils/switchImage.utils';
import ProductOperationButton from '../components/products/ProductOperationButton';
import wishIcon from '../../public/images/wish.svg';
import shopIcon from '../../public/images/black-add-cart.svg';
import Loader from '../components/Loader';
import SetCartQuantity from '../components/cart/SetCartQuantity';
import Modal from '../components/Modal';
import { getRecommendedProducts } from '../features/product/recommededProducts';
import { getProductList } from '../features/product/getProductsSilice';
import { addToWishlist } from '../features/wishlist/wishlistslice';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';


const SingProductPage = () => {
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.singleProduct);
  const { recommendedProducts } = useSelector((state) => state.recommendedProducts);
  let { productsList } = useSelector((state) => state.product);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams()
  const navigate=useNavigate();
  const { data: cart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(singleProduct(id));
    dispatch(getRecommendedProducts());
    dispatch(getProductList({ pageNumber: 1 }));
  }, [dispatch,id]);
  const switchImage = (nextImage) => {
    const setImage = switchCurrentImagesUtil(nextImage, currentImage, [product], { id });
    if (nextImage && setImage.currIdx >= 0) {
      setCurrentImage((prevImage) => prevImage - 1);
    } else if (!nextImage && setImage.currIdx < setImage.imagesLength) {
      setCurrentImage((prevImage) => prevImage + 1);
    }
  };
  const addWishlist = async (productId) => {
    try {
      const response = await dispatch(addToWishlist({ productId })).unwrap();
      showSuccessMessage('Product added successfully');
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };
  const viewProduct = (
    <BuyerViewProduct
      products={product}
      fullImage={currentImage}
      switchImages={<SwitchImages switchCurrentImage={switchImage} className="flex justify-between" />}
      wish={(
        <ProductOperationButton
        onClick={() => { addWishlist(id); }}
          className="mt-[20px] hover:bg-[#22f122] bg-[#f6f4f4] h-[32px] w-[32px] rounded-full flex justify-center items-center"
          icon={wishIcon}
          title="Wish product"
          alt="wish"
        />
)}
      addCart={(
        <Modal
          forceCloseOnChange={cart}
          header={(
            <h2 className="text-2xl mx-auto text-[#64B937]">
              Confirm to add &nbsp;
              {product.name}
              &nbsp;in the cart
            </h2>
          )}
          toggle={(
            <ProductOperationButton
              className="mt-[20px] hover:bg-[#22f122] bg-[#f6f4f4] h-[32px] w-[32px] rounded-full flex justify-center items-center "
              icon={shopIcon}
              title="Shop product"
              alt="shop"
            />
          )}
        >
          <SetCartQuantity
            quantity={product.quantity}
            price={product.price}
            id={product.id}
            name={product.name}
          />
        </Modal>
)}
    />
  );
  return (
    <div data-test-id='recommended'>
      <div className="px-24 xs:px-2">
        {isLoading ? <Loader /> : viewProduct}
      </div>
      <div className='pb-4 mt-20'>
      <h1 className='font-bold text-xl text-center'>Recommended For You</h1>
     <div className=" flex justify-center flex-wrap gap-8 mt-8 ">
        {recommendedProducts ? (
         productsList.rows?.map((p) => {
          if (recommendedProducts.includes(p?.id)) {
            return (
              <div className='bg-white h-auto w-48 xs:w-[90%]  border cursor-pointer' key={p?.id} onClick={()=>{navigate(`/products/${p?.id}`)}}>
                <img src={p.images[0]} className='h-40 w-48 xs:h-auto xs:w-full object-cover'/>
                <div className='flex justify-between'>
                <h1 className='text-indigo-900'>{p?.name}</h1>
                <h1 className='text-green-600'>${p?.price}</h1>
                </div>
              </div>
            );
          }
        })
        ):''}
      </div>
      </div>
    </div>
  );
};

export default SingProductPage;
