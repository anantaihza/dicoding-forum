/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import store from '../../../redux/app/store';
import ButtonCreate from '../../../view/components/home/ButtonCreate';

export default {
  title: 'Component/Home/ButtonCreate',
  component: ButtonCreate,
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
