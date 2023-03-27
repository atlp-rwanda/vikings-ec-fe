import React from 'react';
import InputField from '../components/forms/InputField';

export default {
  title: 'Component/InputField',
  component: InputField,
  argTypes: {
    placeholder: { control: 'email' },
    label: { control: 'email' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'text' },
    onChange: { action: 'onChange' },
  },
};

const Template = (args) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'youremail',
  label: 'Email',
  type: 'text',
  error: '',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'This field is required.',
};
