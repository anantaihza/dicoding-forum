/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import store from '../../../redux/app/store';
import FilterCategory from '../../../view/components/home/FilterCategory';

export default {
  title: 'Component/Home/FilterCategory',
  component: FilterCategory,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
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
