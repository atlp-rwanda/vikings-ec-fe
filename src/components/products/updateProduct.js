import React, { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import InputField from '../forms/InputField';
import Button from '../forms/Button';
import SelectBox from '../forms/select.js';
import Image from '../images';
import productSchema from '../../validations/product/productValidation';
import { updateProduct } from '../../features/product/updateProduct';
import rectangle from '../../../public/images/Group 237534.svg';
import { singleProduct } from '../../features/product/singleProductSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { fetchCategories } from '../../features/categorySlice';
import Loader from '../Loader';
import left from '../../../public/images/left.svg'

const UpdateProductForm = () => {
  const data = useSelector((state) => state.singleProduct.product);
  const loading = useSelector((state) => state.singleProduct.isLoading);
  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.updateProduct);
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const { id } = useParams();
  const today = formatDate(new Date());
  let extractedDate =
    data && data.expiryDate ? formatDate(data.expiryDate) : '';

  useEffect(() => {
    setOldImages(data?.images);
    setValue('name', data?.name);
    setValue('price', data?.price);
    setValue('bonus', data?.bonus);
    setValue('categoryId', data?.categoryId);
    setValue('quantity', data?.quantity);
    setValue('expiryDate', extractedDate);
    setValue('oldImages', oldImages);
  }, [data?.images]);
  useEffect(() => {
    dispatch(singleProduct(id));
    dispatch(fetchCategories()).unwrap();
  }, []);
  const onSubmit = async (productData) => {
    try {
      const formData = new FormData();
      images.map((file) => {
        formData.append('images', file);
      });
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('bonus', productData.bonus);
      formData.append('categoryId', productData.categoryId);
      formData.append('quantity', productData.quantity);
      formData.append('expiryDate', productData.expiryDate);
      formData.append('oldImages', oldImages);
      const response = await dispatch(
        updateProduct({ productData: formData, id: id })
      ).unwrap();
      dispatch(fetchCategories()).unwrap();
      dispatch(singleProduct(id));
      setImages([]);
      navigate('/dashboard/products');
      showSuccessMessage(response?.message);
    } catch (error) {
      showErrorMessage(error.data?.message);
      setPreview([]);
      setOldImages(oldImages);
    }
  };
  const handleFileInputChange = (event) => {
    let URLs = [];
    let newImages = [];
    const files = event.target.files;
    Array.from(files).map((file) => {
      URLs.push(URL.createObjectURL(file));
      newImages.push(file);
    });
    setPreview([...URLs, ...(oldImages || [])]);
    setImages(newImages);
  };
  const handleRemoveImage = (image, index) => {
    const URLs = [];
    const updatedOldImages = oldImages?.filter((img) => img !== image);
    const updatedImages = images?.filter((_, img) => img !== index);
    updatedImages.map(async (file) => {
      URLs?.push(URL.createObjectURL(file));
    });
    setImages(updatedImages);
    setOldImages(updatedOldImages);
    setPreview([...URLs, ...updatedOldImages]);
  };
  if (loading) return <Loader />;
  return (
    <div className="md:px-24 xs:px-4 sm:px-4">
      <Link to="/dashboard/products" className="cursor-pointer mb-4 block">
        <img src={left} alt="Back Icon" className="inline-flex mr-4"/>
        All Products
      </Link>
      <div className="flex flex-col md:flex-row justify-between gap-6">
      <form
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
        className="md:w-1/2"
        role="update-product-form"
      >
        <div className="flex flex-col -space-y-px rounded-md">
            <InputField
              type="text"
              label="Name"
              className=" w-full px-2 py-2 sm:text-[12px] my-0 focus:bg-white bg-white"
              {...register('name')}
              error={errors?.name}
              role="name"
            />
            <SelectBox
              label="Category"
              className=" w-full px-2 py-2 sm:text-[12px] my-2 focus:bg-white bg-white"
              {...register('categoryId')}
              options={categories}
              category={data?.categoryId}
              error={errors?.categoryId}
            />
            <InputField
              type="number"
              label="Price"
              className=" w-full px-2 py-2 sm:text-[12px] my-0 focus:bg-white bg-white"
              {...register('price')}
              error={errors?.price}
            />
            <InputField
              type="number"
              label="Bonus"
              className=" w-full px-2 py-2 sm:text-[12px] my-0 focus:bg-white bg-white"
              {...register('bonus')}
              error={errors?.bonus}
            />
            <InputField
              type="number"
              label="Quantity"
              className=" w-full px-2 py-2 sm:text-[12px] my-0 focus:bg-white bg-white"
              {...register('quantity')}
              error={errors?.quantity}
            />
            <InputField
              type="date"
              label="Expiry date"
              className=" w-full px-2 py-2 sm:text-[12px] my-0 focus:bg-white bg-white"
              {...register('expiryDate')}
              min={today}
              error={errors?.expiryDate}
            />
          <InputField
            type="file"
            parentClassName="hidden"
            id="images"
            name="files"
            data-testid="upload-image-input"
            {...register('oldImages')}
            onChange={handleFileInputChange}
            accept="image/x-png,image/gif,image/jpeg,image/webp"
            multiple={true}
          />
            {isLoading ? (
              <>
                <Button
                  type="submit"
                  label=""
                  className="rounded-none relative bottom-0"
                  disabled={true}
                >
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                label="Save Changes"
                role="button"
                className="rounded-none sm:relative"
              />
            )}
        </div>
      </form>
        <div className="images grid grid-cols-2 gap-8">
          {(preview?.length > 0 ? [...preview] : oldImages)?.map(
            (image, index) => (
              <div key={index} className="cursor-pointer">
                <span
                  className="absolute text-green-600 bg-yellow-400 px-5 sm:py-3 py-2 cursor-pointer"
                  onClick={() => handleRemoveImage(image, index)}
                  role="remove-img"
                >
                  Remove
                </span>
                <Image
                  src={image}
                  alt="image"
                  className="lg:h-[250px] lg:w-[250px] sm:h-[180px] sm:w-[180px] xs:h-[150px] xs:w-[150px]  object-cover border border-gray-100"
                />
              </div>
            )
          )}
          <label htmlFor="images">
            <div className="cursor-pointer" role="upload-image">
              <Image
                src={rectangle}
                alt="image"
                className="lg:h-[250px] lg:w-[250px] sm:h-[180px] sm:w-[180px] xs:h-[150px] xs:w-[150px]  object-cover border border-gray-100"
              />
            </div>
          </label>
        </div>
    </div>
    </div>
  );
};

export default UpdateProductForm;
