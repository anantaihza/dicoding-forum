/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import store from '../../../redux/app/store';
import CategoryPopular from '../../../view/components/home/CategoryPopular';

export default {
  title: 'Component/Home/CategoryPopular',
  component: CategoryPopular,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export const Default = {};
