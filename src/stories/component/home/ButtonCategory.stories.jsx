/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import store from '../../../redux/app/store';
import ButtonCategory from '../../../view/components/home/ButtonCategory';

export default {
  title: 'Component/Home/ButtonCategory',
  component: ButtonCategory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ButtonCategory is a button to filter categories.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    isSelected: { control: 'boolean' },
  },
};

export const AllCategorySelected = {
  args: {
    name: 'All',
    isSelected: true,
  },
};

export const AllCategory = {
  args: {
    name: 'All',
    isSelected: false,
  },
};

export const OtherCategorySelected = {
  args: {
    name: 'Other',
    isSelected: true,
  },
};

export const OtherCategory = {
  args: {
    name: 'Other',
    isSelected: false,
  },
};
