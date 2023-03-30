import React from 'react';
import InputField from '../forms/InputField';
import Button from '../forms/Button';

function Address({ data }) {
  return (
    <form>
      <InputField name="country" label="Country" type="text" />
      <InputField name="state" label="State" type="text" />
      <InputField name="province" label="Province" type="email" />
      <InputField name="city" label="City" type="date" />
      <InputField name="street" label="Street" type="text" />
      <InputField name="zipCode" label="Zip code" type="tel" />
      <Button label="Save" />
    </form>
  );
}

export default Address;
