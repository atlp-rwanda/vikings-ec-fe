import React from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../forms/InputField';
import Button from '../forms/Button';
import { updateProfile } from '../../features/profile/updateProfileSlice';
import { addressSchema } from '../../validations/inputValidation';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import convertToSlug from '../../utils/slug';
import loader from '../../../public/images/icons/loader.svg';

const Address = ({ data }) => {
  const profileInputFields =[
    {
      name: 'country',
      label: 'Country',
      type: 'text'
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
    },
    {
      name: 'province',
      label: 'Province',
      type: 'text',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
    },
    {
      name: 'streetAddress',
      label: 'Street',
      type: 'text'
    },
    {
      name: 'zipCode',
      label: 'Zip code',
      type: 'tel'
    }
  ];
  const { isLoading } = useSelector((state) => state.updateProfile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
        country: data?.billingAddress?.country,
        state: data?.billingAddress?.state,
        province: data?.billingAddress?.province,
        city: data?.billingAddress?.city,
        streetAddress: data?.billingAddress?.streetAddress,
        zipCode: data?.billingAddress?.zipCode,
    },
  });
  const dispatch = useDispatch();
  const onSubmit = async (addressData) => {
    try {
      const response = await dispatch(updateProfile({
        ...data,
        billingAddress: JSON.stringify(addressData)
      })).unwrap();
      showSuccessMessage(response.message);
    } catch (error){
      showErrorMessage(error.data.message);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(onSubmit)(event);
      }}
    >
      {
        profileInputFields.map((field) => {
          return (
            <InputField
              key={convertToSlug(field.label)}
              id={field.name}
              label={field.label}
              type={field.type}
              parentClassName="h-fit flex items-center gap-6 xs:flex-col xs:items-start xs:gap-0"
              styles="w-32"
              className="w-3/5 px-2 py-1 border border-gray-300 text-[16px] text-gray-500 my-2 focus:text-gray-900 xs:w-auto"
              {...register(field.name)}
              error={errors?.[field.name]}
          />)
        })
      }
      { !isLoading ?

        (
          <Button
            label="Save"
            parentClassName="flex xs:block"
            className="!w-fit text-white bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-4 font-bold rounded-none self-end ml-auto xs:w-full"
          />
        ): (
          <Button
            className="!w-fit text-white bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-4 font-bold rounded-none self-end ml-auto xs:w-full"
            parentClassName="flex xs:block"
          >
            <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />
          </Button>
        )
      }
    </form>
  );
};

export default Address;
