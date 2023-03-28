import Button from '../components/forms/Button';

export default {
  title: 'component/Button',
  component: Button,
  argsTypes: { onClick: { action: 'handleSignIn' } },
};

const Template = (args) => <Button {...args} />;

export const Label = Template.bind({});

Label.args = {
  label: 'Sign in',
};
