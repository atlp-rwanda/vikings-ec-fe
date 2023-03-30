import React from 'react';
import InputField from '../forms/InputField';
import Button from '../forms/Button';

function Security({ data }) {
  return (
    <form>
      <InputField name="oldpassword" label="Old password" type="password" />
      <InputField name="newpassword" label="New password" type="password" />
      <Button label="Save" />
    </form>
  );
}

export default Security;
