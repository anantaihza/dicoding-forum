/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import store from '../../../redux/app/store';
import { putAccessToken, removeAccessToken } from '../../../utils/api/userAPI';
import Navbar from '../../../view/components/common/Navbar';
import { setData } from '../../../redux/features/auth/authSlice';

export default {
  title: 'Component/Common/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '200px',
      },
    },
  },
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

export const LoggedIn = {
  args: {},
  render: function Render(args) {
    useEffect(() => {
      putAccessToken('mockAccessToken');
      store.dispatch(
        setData({
          avatar: 'https://ui-avatars.com/api/?name=Jhon&background=random',
          name: 'John Doe',
        })
      );
    }, []);
    return <Navbar {...args} />;
  },
};

export const LoggedOut = {
  args: {},
  render: function Render(args) {
    useEffect(() => {
      removeAccessToken();
      store.dispatch(setData(null));
    }, []);

    return <Navbar {...args} />;
  },
};
