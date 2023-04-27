import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../features/createProductSlice';
import createProductSchema from '../../validations/createProduct.validation';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { fetchCategories } from '../../features/categorySlice';
import getFormFromObject from '../../utils/getFormData';
import convertDate from '../../utils/formatDate';
import { formatDate } from '../../utils/formatDate';
import { Link, useNavigate } from 'react-router-dom';
import left from '../../../public/images/left.svg';

const CreateProductForm = () => {
  const { isLoading } = useSelector((state) => state.createProduct);
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState([]);

  const today = formatDate(new Date());

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    const images = files;
    setSelectedImages(images);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.category.categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createProductSchema),
  });

  useEffect(() => {
    setValue('images', selectedImages);
  }, [selectedImages]);

  const onSubmit = async (productData) => {
    delete productData.images;
    let date = productData.expiryDate;
    delete productData.expiryDate;
    date = convertDate(date);
    const newData = getFormFromObject(productData);
    selectedImages.forEach((image) => {
      newData.append('images', image);
    });
    newData.append('expiryDate', date);
    try {
      const response = await dispatch(createProduct(newData)).unwrap();
      showSuccessMessage(response.message);
      setSelectedImages([]);
      reset();
      return (window.location.href = '/dashboard/products');
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };

  return (
    <div className="md:px-24 xs:px-4 sm:px-4">
      <Link to="/dashboard/products" className="cursor-pointer mb-4 block">
        <img src={left} alt="Back Icon" className="inline-flex mr-4"/>
        All Products
      </Link>
      <form
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
      >
        <div className="grid md:grid-cols-2 gap-10 sm:grid-flow-row">
          <div className="">
            <div className="my-7">
              <InputField
                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-8"
                label="Name"
                placeholder="Product Name"
                type="text"
                {...register('name')}
                error={errors?.name}
              />
            </div>

            <div className="my-7">
              <select
                className="appearance-none border w-full px-3 text-gray-700 leading-tight focus:outline-none h-8"
                {...register('categoryId')}
                defaultValue={''}
              >
                <option disabled value="">
                  Select category
                </option>
                {categories?.map((category) => (
                  <option
                    data-testid="select-option"
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors?.categoryId && (
                <p className="text-red-500 text-xs ">
                  {errors?.categoryId?.message}
                </p>
              )}
            </div>

            <div className="my-7">
              <InputField
                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-8"
                label="Price"
                placeholder="Product Price"
                type="number"
                {...register('price')}
                error={errors?.price}
              />
            </div>

            <div className="my-7">
              <InputField
                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-8"
                label="Quantity"
                placeholder="Product Quantity"
                type="number"
                {...register('quantity')}
                error={errors?.quantity}
              />
            </div>

            <div className="my-7">
              <InputField
                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-8"
                label="Bonus"
                placeholder="Product Bonus"
                type="number"
                {...register('bonus')}
                error={errors?.bonus}
              />
            </div>

            <div className="my-7">
              <InputField
                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-8"
                label="Expiry Date"
                name="Expiry Date"
                type="date"
                min={today}
                {...register('expiryDate')}
                error={errors?.expiryDate}
              />
            </div>

            <div className="my-7 w-28 xs:w-full xs:sticky xs:top-[100vh]">
              {isLoading ? (
                <>
                  <Button type="submit" label="" className="" disabled={true}>
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
                  role="submit"
                  label="Save"
                  className="w-28 h-8 rounded-none"
                />
              )}
            </div>
          </div>

          <div className=" grid grid-cols-2 content-baseline justify-items-center gap-3 md:gap-10">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="w-24 h-24 md:w-48 md:h-48 border object-cover py-1 px-1"
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                  />
                );
              })}
            <label htmlFor="images" className="w-24 h-24 md:w-48 md:h-48">
              <div className="w-24 h-24 md:w-48 md:h-48 border py-6 md:py-16 text-[2rem] text-center bg-white">
                +
              </div>
              {errors?.images && (
                <p className="text-red-500 text-xs ">
                  {errors?.images?.message}
                </p>
              )}
            </label>
            <input
              className="hidden"
              name="images"
              id="images"
              onChange={handleFileInputChange}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              multiple
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
