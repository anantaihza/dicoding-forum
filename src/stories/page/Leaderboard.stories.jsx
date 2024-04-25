/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';
import Leaderboard from '../../view/pages/Leaderboard';

export default {
  title: 'Page/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'fullscreen',
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

export const Default = {};
