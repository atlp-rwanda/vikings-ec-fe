import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from './InputField';
import Button from './Button';
import { categorySchema } from '../../validations/inputValidation';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../createCategorySlice';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import loader from '../../../public/images/icons/loader.svg';

const CreateCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const { isLoading } = useSelector((state) => state.createCategory );
  const dispatch = useDispatch();

  const onSubmit = async(categoryName) =>{
    try{
      const response = await dispatch(createCategory(categoryName)).unwrap();
      showSuccessMessage(response.message);
    }catch(err){
      console.log(err);
      showErrorMessage(err.data.message);
    }
  }

  return (
    <div data-testid="create-category">
      <form onSubmit={(event)=>{handleSubmit(onSubmit)(event);}}>
        <InputField
          label="Name"
          parentClassName="h-fit flex items-center gap-6 xs:flex-col xs:items-start xs:gap-0 p-8"
          styles="w-32"
          className="px-2 py-1 border border-gray-300 text-[16px] text-gray-500 my-2 focus:text-gray-900 xs:w-auto"
          {...register('name')}
          error={errors?.name}
        />
        <div>
          {isLoading? (
            <Button
              className="!w-fit text-white bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-4 font-bold rounded-none xs:w-full"
              parentClassName="flex justify-center"
            >
              <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />
            </Button>
          ): (
            <Button
              label="Create"
              parentClassName="flex justify-center"
              className="!w-fit text-white bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-4 font-bold rounded-none xs:w-full"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
