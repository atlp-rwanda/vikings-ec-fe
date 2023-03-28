import { addDecorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import GoogleAuthButton from '../components/GoogleAuthButton';

export default {
  title: 'component/Google authBtn',
  component: GoogleAuthButton,
  argsTypes: {},
};

function Template(args) {
  return <GoogleAuthButton {...args} />;
}
addDecorator((story) => (
  <BrowserRouter basename="/">{story()}</BrowserRouter>
));

export const Label = Template.bind({});

Label.args = {
  label: 'Google auth button',
};
