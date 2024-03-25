const summaryVote = (votes) => votes.length;

const isMyIdVote = (id, votesBy) => votesBy.includes(id);

export { summaryVote, isMyIdVote };
