import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from './Avatar';
import InputField from './InputField';
import Button from '../forms/Button';
import { updateProfile } from '../../features/actions/profileAction';

function Account({ data }) {
  const {
    firstname, lastname, email, gender, birthdate, phone, avatar
  } = data;
  const [account, setAccount] = useState({
    firstname,
    lastname,
    email,
    gender,
    birthdate,
    phone,
  });
  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setAccount({ ...account, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(account).every((value) => value)) {
      dispatch(updateProfile({ ...account }));
    }
  };
  return (
    <>
      <div className="flex flex-row items-center gap-5 mb-6">
        <Avatar {...data} />
        <Button label="Change avatar" />
      </div>
      <form>
        <InputField
          name="firstname"
          id="firstname"
          label="First name"
          type="text"
          value={account.firstname}
          onChange={handleChange}
        />
        <InputField
          name="lastname"
          id="lastname"
          label="Last name"
          type="text"
          value={account.lastname}
          onChange={handleChange}
        />
        <InputField
          name="email"
          id="email"
          label="Email"
          type="email"
          value={account.email}
          onChange={handleChange}
        />
        <InputField
          name="birthdate"
          id="birthdate"
          label="Date of birth"
          type="date"
          value={account.birthdate}
          onChange={handleChange}
        />
        <InputField
          name="gender"
          id="gender"
          label="Gender"
          type="text"
          value={account.gender}
          onChange={handleChange}
        />
        <InputField
          name="phone"
          id="phone"
          label="Phone Number"
          type="tel"
          value={account.phone}
          onChange={handleChange}
        />
        <Button
          label="Save"
          className="text-white bg-green-500 hover:bg-green-600 text-sm px-5 py-2.5 mt-4 ml-auto font-bold"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}

export default Account;
