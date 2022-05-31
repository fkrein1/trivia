const API_URL = 'https://opentdb.com/api.php?amount=5&token=';

const getAsk = async (token, difficulty, category) => {
  let url = `${API_URL}${token}`;
  if (difficulty !== 'any') url = `${url}&difficulty=${difficulty}`;
  if (category !== 'any') url = `${url}&category=${category}`;
  const apiToken = await fetch(url);
  const apiTokenData = await apiToken.json();
  return apiTokenData;
};

export default getAsk;
