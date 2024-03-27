const filterThreadByCategory = (threads, category) =>
  threads?.filter((thread) => thread?.category === category);

export default filterThreadByCategory;
