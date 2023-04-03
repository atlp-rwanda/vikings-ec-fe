import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import getFormFromObject from '../../utils/getFormData';
import Avatar from './Avatar';
import InputField from './InputField';
import Button from '../forms/Button';
import { updateProfile } from '../../features/actions/updateProfileAction';

const fields = {
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Your last name is required'),
  email: yup.string().email().required('Your email is required'),
  gender: yup.string().required('Your gender is required'),
  birthdate: yup.date().required('Your birthdate is required'),
  phone: yup.string().required('Your phone number is required'),
};
const schema = yup.object(fields);

const Account = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      gender: data.gender,
      birthdate: data.birthdate.slice(0, 10),
      phone: data.phone,
      avatar: data.avatar,
    },
  });
  const avatar = useSelector((state) => state.profile.data.avatar);

  const dispatch = useDispatch();
  const onSubmit = (userData) => {
    const updateData = getFormFromObject(userData);
    updateData.append('avatar', avatar);
    dispatch(updateProfile(updateData));
  };
  let newAvatar;
  const handleSelectFile = (e) => {
    newAvatar = URL.createObjectURL(e.target.files[0]);
    dispatch(updateProfile({ avatar: newAvatar }));
  };
  return (
    <>
      <div className="flex flex-row items-center gap-5 mb-6">
        <Avatar avatar={avatar ?? newAvatar } />
        <InputField type="file" {...register('avatar')} onChange={handleSelectFile} />
      </div>
      <form
        encType="multipart/form"
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
      >
        <InputField
          id="firstname"
          label="First name"
          type="text"
          placeholder="First name"
          {...register('firstname')}
        />
        <InputField
          id="lastname"
          label="Last name"
          type="text"
          placeholder="Last name"
          {...register('lastname')}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <InputField
          id="birthdate"
          label="Date of birth"
          type="date"
          placeholder="Date of birth"
          {...register('birthdate')}
        />
        <InputField
          id="gender"
          label="Gender"
          type="text"
          placeholder="Gender"
          {...register('gender')}
        />
        <InputField
          id="phone"
          label="Phone"
          type="tel"
          placeholder="Phone"
          {...register('phone')}
        />
        <Button
          label="Save"
          className="text-white bg-green-500 hover:bg-green-600 text-sm px-5 py-2.5 mt-4 ml-auto font-bold"
        />
      </form>
    </>
  );
};

export default Account;
