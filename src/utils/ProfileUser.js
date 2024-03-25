const getProfileUserThread = (users, idUserThread) => {
  try {
    const result = users.filter((user) => user.id === idUserThread);
    return result[0];
  } catch (error) {
    return null;
  }
};

export default getProfileUserThread;
