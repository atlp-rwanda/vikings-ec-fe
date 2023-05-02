import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const SingProductPage = () => {
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.singleProduct);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    dispatch(singleProduct(id));
  }, [dispatch]);

  const switchImage = (nextImage) => {
    const setImage = switchCurrentImagesUtil(nextImage, currentImage, [product], { id });
    if (nextImage && setImage.currIdx >= 0) {
      setCurrentImage((prevImage) => prevImage - 1);
    } else if (!nextImage && setImage.currIdx < setImage.imagesLength) {
      setCurrentImage((prevImage) => prevImage + 1);
    }
  };
  const viewProduct = (
    <BuyerViewProduct
      products={product}
      fullImage={currentImage}
      switchImages={<SwitchImages switchCurrentImage={switchImage} className="relative flex sm:justify-between xs:gap-52 md:top-12 cursor-pointer xs:top-2 sm:top-2" />}
      wish={(
        <ProductOperationButton
          className="mt-[20px] hover:bg-[#22f122] bg-[#f6f4f4] h-[32px] w-[32px] rounded-full flex justify-center items-center"
          icon={wishIcon}
          title="Wish product"
          alt="wish"
        />
)}
      addCart={(
        <Modal
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
    <div>
      <div className="px-24 xs:px-2">
        {isLoading ? <Loader /> : viewProduct}
      </div>
    </div>
  );
};

export default SingProductPage;
