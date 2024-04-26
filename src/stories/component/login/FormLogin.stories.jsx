/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../redux/app/store';
import FormLogin from '../../../view/components/login/FormLogin';

export default {
  title: 'Component/Login/FormLogin',
  component: FormLogin,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
};

export const Default = {};
