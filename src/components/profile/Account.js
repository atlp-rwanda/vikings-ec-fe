import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import getFormFromObject from '../../utils/getFormData';
import Avatar from './Avatar';
import InputField from '../forms/InputField';
import Button from '../forms/Button';
import { updateProfile, updateProfileActions } from '../../features/profile/updateProfileSlice';
import { accountSchema } from '../../validations/inputValidation';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import convertToSlug from '../../utils/slug';
import loader from '../../../public/images/icons/loader.svg';
const Account = ({ data }) => {
  const profileInputFields = [
    {
      name: 'firstname',
      label: 'First name',
      type: 'text'
    },
    {
      name: 'lastname',
      label: 'Last name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'birthdate',
      label: 'Date of birth',
      type: 'date',
      max: new Date().toISOString().slice(0, 10),
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'text'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel'
    }
  ]
  const { avatar } = useSelector((state) => state.updateProfile.ui);
  const { isLoading } = useSelector((state) => state.updateProfile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      gender: data.gender,
      birthdate: data.birthdate?.slice(0, 10),
      phone: data.phone,
      avatar: data.avatar,
    },
  });
  const dispatch = useDispatch();
  const onSubmit = async (userData) => {
    try {
      delete userData.avatar;
      const updateData = getFormFromObject(userData);
      avatar && updateData.append('avatar', avatar);
      const response = await dispatch(updateProfile(updateData)).unwrap();
      showSuccessMessage(response.message);
    } catch (error){
      showErrorMessage(error.data.message);
    }
  };
  return (
    <>
      <div className="xs:flex-col flex flex-row items-center gap-5 mb-6">
        <Avatar avatar={avatar ? URL.createObjectURL(avatar) : data.avatar} />
        <InputField
          type="file"
          {...register('avatar')}
          parentClassName="h-fit"
          onChange={(e) => {
            dispatch(updateProfileActions.changeAvatar({ avatar: e.target.files[0] }));
          }}
        />
      </div>
      <form
        encType="multipart/form"
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
      >
        {
          profileInputFields.map((field)=>{
            return(
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
              max={field.max}
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
    </>
  );
};

export default Account;
