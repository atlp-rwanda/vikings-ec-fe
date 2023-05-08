import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/products/ProductCard';
import { getProductList } from '../../features/product/getProductsSilice';
import SellerViewSingleProduct from '../../components/products/SellerViewSingleProduct';
import left from '../../../public/images/left.svg';
import switchCurrentImage from '../../utils/switchImage.utils';
import SwitchImages from '../../components/products/SwitchImages';
import deleteIcon from '../../../public/images/Delete.png';
import editIcon from '../../../public/images/edit.svg';
import ProductOperationButton from '../../components/products/ProductOperationButton';
import PageCount from '../../components/products/PageCount';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../components/ConfirmDelete';
import { deleteProduct } from '../../features/product/deleteProduct';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

const Products = () => {
  const dispatch = useDispatch();
  const { productsList, isLoading } = useSelector((state) => state.product);
  const loading = useSelector((state) => state.deleteProduct?.isLoading);
  const [productClicked, setProductClicked] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [productId, setProductId] = useState('');

  const handleConfirm = async () => {
    try {
      const response = await dispatch(deleteProduct(productId)).unwrap();
      showSuccessMessage(response?.message);
      setShowModel(false);
      await dispatch(getProductList({ pageNumber: 1 }));
    } catch (error) {
      showErrorMessage(error.data.message);
      setShowModel(false);
    }
  };
  useEffect(() => {
    dispatch(getProductList({ pageNumber: 1 }));
  }, [dispatch]);

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

  const viewSingleProduct = (name, image, price, quantity, id, bonus, isAvailable) => {
    setSelectedProduct({
      name,
      image,
      price,
      quantity,
      id,
      isAvailable
    });
    setProductClicked(true);
  };

  const switchImage = (nextImage) => {
    const setImage = switchCurrentImage(
      nextImage,
      currentImage,
      productsList.rows,
      selectedProduct,
    );
    if (nextImage && setImage.currIdx >= 0) {
      setCurrentImage((prevImage) => prevImage - 1);
    } else if (!nextImage && setImage.currIdx < setImage.imagesLength - 1) {
      setCurrentImage((prevImage) => prevImage + 1);
    }
    setImage.currIdx !== -1
      ? setSelectedProduct((prevSelectedProduct) => ({
        ...prevSelectedProduct,
        image: setImage.currImg,
      }))
      : null;
  };

  let viewProducts = null;
  let pageCount = null;
  if (Array.isArray(productsList.rows) && productsList.rows.length > 0) {
    if (productClicked) {
      viewProducts = productsList.rows
        .slice(0, 4)
        .map((row) => (
          <ProductCard
            key={row.id}
            product={row}
            deleteBTN={(
              <ProductOperationButton
                className="mt-[20px] bg-[#fd1919] hover:bg-[#5f0d0d] h-[32px] w-[32px] rounded-full flex justify-center items-center"
                icon={deleteIcon}
                title="Delete product"
                onClick={() => {
                  setShowModel(true);
                  setProductId(row.id);
                }}
                alt="delete"
                size="w-[16px] h-[22px]"
              />
            )}
            editBTN={(
              <ProductOperationButton
                className="mt-[20px] bg-[#fffdfd] hover:bg-[#b6b4b4] h-[32px] w-[32px] rounded-full flex justify-center items-center"
                icon={editIcon}
                title="Edit product"
                onClick={() => {
                  navigate(`/dashboard/products/${row.id}`);
                }}
                alt="edit"
                size="w-[20px] h-[18px]"
              />
            )}
            viewSingleProduct={viewSingleProduct}
          />
        ));
    } else if (Array.isArray(productsList.rows)) {
      viewProducts = productsList.rows.map((row) => (
        <ProductCard
          key={row.id}
          product={row}
          deleteBTN={(
            <ProductOperationButton
              className="mt-[20px] bg-[rgb(253,25,25)] hover:bg-[#5f0d0d] h-[32px] w-[32px] rounded-full flex justify-center items-center"
              icon={deleteIcon}
              title="Delete product"
              onClick={() => {
                setShowModel(true);
                setProductId(row.id);
              }}
              alt="delete"
              size="w-[16px] h-[22px]"
            />
          )}
          editBTN={(
            <ProductOperationButton
              className="mt-[20px] bg-[#fffdfd] hover:bg-[#b6b4b4] h-[34px] w-[34px] rounded-full flex justify-center items-center"
              icon={editIcon}
              title="Edit product"
              onClick={() => {
                navigate(`/dashboard/products/${row.id}`);
              }}
              alt="edit"
              size="w-[20px] h-[18px]"
            />
          )}
          viewSingleProduct={viewSingleProduct}
        />
      ));

      pageCount = (
        <PageCount
          className=""
          currentPage={productsList.currentPage}
          totalPages={productsList.totalPages}
          click={setPageNumberHandler}
        />
      );
    }
  }

  return (
    <div>
      <div className="flex space-x-2 md:px-24 xs:px-4 sm:px-4 mb-5 items-center">
            {showModel && (
        <ConfirmDelete
          showModel={showModel}
          message="Are you sure you want to delete this product?"
          title="Confirm delete product"
          onClick={handleConfirm}
          setShowModel={setShowModel}
          isLoading={loading}
        />
      )}
      </div>
      <div className="flex space-x-2 md:px-24 xs:px-4 sm:px-4">
        <h2 onClick={() => setProductClicked(false)} className="cursor-pointer">
          { productClicked ? (
            <>
              <img src={left} alt="Back Icon" className="inline-flex mr-4" />
              Go back
            </>
          ) : 'All products'}
        </h2>
      </div>
      <div className="space-y-4">
        <div className="w-full md:px-24 xs:px-4 sm:px-4">
          <button
            onClick={() => navigate('/dashboard/products/create')}
            className="block text-white bg-green-500 hover:bg-green-600 text-sm px-5 py-2.5 mt-4 ml-auto font-bold w-fit text-center"
          >
            + Add new product
          </button>
        </div>
        {productClicked && (
          <div className="md:px-24 xs:px-4 sm:px-4">
            <SellerViewSingleProduct
              product={selectedProduct}
              rating={3}
              deleteBTN={(
                <ProductOperationButton
                  className="mt-[20px] hover:bg-[#5f0d0d] bg-[rgb(253,25,25)] h-[32px] w-[32px] rounded-full flex justify-center items-center"
                  icon={deleteIcon}
                  title="Delete product"
                  onClick={() => {
                    setShowModel(true);
                    setProductId(selectedProduct.id);
                  }}
                  alt="delete"
                  size="w-[16px] h-[22px]"
                />
              )}
              editBTN={(
                <ProductOperationButton
                  className="mt-[20px] bg-[#fffdfd] hover:bg-[#b6b4b4] h-[34px] w-[34px] rounded-full flex justify-center items-center"
                  icon={editIcon}
                  title="edit product"
                  onClick={() => {
                    navigate(
                      `/dashboard/products/${selectedProduct.id}`
                    );
                  }}
                  alt="edit"
                  size="w-[20px] h-[18px]"
                />
              )}
              switchImages={(
                <SwitchImages
                  switchCurrentImage={switchImage}
                  className="flex absolute justify-between top-20 w-full cursor-pointer"
                />
              )}
            />
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="px-10 md:px-24 xl:px-60 xs:px-2 grid md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1 gap-10">
            {viewProducts}
          </div>
        )}
      </div>
      <br />
      <div>
        { !isLoading ? pageCount : null }
      </div>
    </div>
  );
};

export default Products;
