import Button from '../components/forms/Button';

export default {
  title: 'component/Button',
  component: Button,
  argsTypes: { onClick: { action: 'handleSignIn' } },
};

function Template(args) {
  return <Button {...args} />;
}

export const Label = Template.bind({});

Label.args = {
  label: 'Sign in',
};
