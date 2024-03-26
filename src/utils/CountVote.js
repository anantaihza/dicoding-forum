const summaryVote = (votes) => {
  const checkVote = votes ?? [];
  return checkVote.length;
};

const isMyIdVote = (id, votesBy) => {
  const checkVote = votesBy ?? [];
  return checkVote.includes(id);
};

export { summaryVote, isMyIdVote };
