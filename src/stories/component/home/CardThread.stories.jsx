import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../redux/app/store';
import CardThread from '../../../view/components/home/CardThread';

export default {
  title: 'CardThread',
  component: CardThread,
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

const mockThread = {
  id: '1',
  title: 'Diskusi tentang React',
  category: 'Teknologi',
  createdAt: new Date().toISOString(),
  body: '<p>Ini adalah contoh teks untuk body thread.</p>',
  ownerId: 'user1',
  upVotesBy: ['user1', 'user2'],
  downVotesBy: ['user3'],
  totalComments: 10,
};

// const mockUsers = {
//   users: [
//     {
//       id: 'user1',
//       name: 'John Doe',
//       avatar: 'https://ui-avatars.com/api/?name=John+Doe',
//     },
//     {
//       id: 'user2',
//       name: 'Jane Doe',
//       avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
//     },
//     {
//       id: 'user3',
//       name: 'Alice',
//       avatar: 'https://ui-avatars.com/api/?name=Alice',
//     },
//   ],
// };

export const Default = {
  args: {
    thread: mockThread,
  },
};
