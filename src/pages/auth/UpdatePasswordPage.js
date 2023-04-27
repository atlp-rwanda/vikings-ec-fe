import React from 'react';
import InputField from '../../components/forms/InputField';
import Button from '../../components/forms/Button';
import { updatePassword } from '../../features/auth/updatePasswordSlice';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePasswordSchema } from '../../validations/inputValidation';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import loader from '../../../public/images/icons/loader.svg';


const updatePasswordPage = () =>{
  const { isLoading } = useSelector((state) => state.updatePassword);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });
  const onSubmit = async (passwordData) => {
    try {
      const response = await dispatch(updatePassword(passwordData)).unwrap();

      showSuccessMessage(response.message);
      localStorage.clear()
      return (location.href = `/auth/signin`);
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  return (
      <div className="flex flex-col ">
       <div className="hidden sm:flex ">
       </div>
       <>
    <form
      onSubmit={(event) => {
        handleSubmit(onSubmit)(event);
      }}
      className='my-4 px-2'
    >
      <div className=''>
        <div className=''>
          <InputField
            label="Old password"
            name="old_password"
            id="old_password"
            type={'password'}
           parentClassName="h-fit flex items-center gap-6 xs:flex-col xs:items-start xs:gap-0"
              styles="w-32"
              className="w-3/5 px-2 py-1 border border-gray-300 text-[16px] text-gray-500 my-2 focus:text-gray-900 xs:w-auto"
            {...register('old_password')}
            error={errors?.old_password}
          />
        </div>
        <div className="">
          <InputField
            label="New password"
            name="new_password"
            id="new_password"
            type={'password'}
            parentClassName="h-fit flex items-center gap-6 xs:flex-col xs:items-start xs:gap-0"
            styles="w-32"
             className="w-3/5 px-2 py-1 border border-gray-300 text-[16px] text-gray-500 my-2 focus:text-gray-900 xs:w-auto"
            {...register('new_password')}
            error={errors?.new_password}
          />
        </div>
        <div>
          {isLoading ? (
              <Button
              className="!w-fit text-white bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-4 font-bold rounded-none self-end ml-auto xs:w-full"
              parentClassName="flex xs:block"
            >
              <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />
            </Button>
          ) : (
            <Button
        label="Save"
        parentClassName="flex"
        className="!w-fit text-white bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-4 font-bold rounded-none self-end ml-auto"
      />
          )}
        </div>
      </div>
    </form>
  </>
      </div>
    
   
  )
}

export default updatePasswordPage;


