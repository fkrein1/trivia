export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user,
});

export const updateScore = (score, assertions) => ({
  type: 'UPDATE_SCORE',
  payload: {
    score,
    assertions,
  },
});

export const resetState = () => ({
  type: 'RESET_STATE',
});
