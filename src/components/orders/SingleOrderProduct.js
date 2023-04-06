import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { singleProduct } from "../../features/product/singleProductSlice";

export const SingleOrderProduct = ({ product }) => {
  const [productDetails, setProductDetails] = useState();
  const dispatch = useDispatch();
  const fetchProductDetails = async () => {
    try {
      const response = await dispatch(
        singleProduct(product.productId)
      ).unwrap();
      setProductDetails(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProductDetails();
  }, [product]);
  return (
    <div className="flex items-center" data-testid="product-name">
      <p className="font-bold text-gray-800">{productDetails?.name || " "}</p>
      <p className="ml-auto font-bold text-right text-gray-800">
        {product?.quantity}
      </p>
    </div>
  );
};
