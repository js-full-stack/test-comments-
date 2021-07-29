import axios from 'axios';

axios.defaults.baseURL = 'https://jordan.ashton.fashion/api';
const URL = '/goods/30/comments';

const getComments = async (currentPage = 1) => {
  const paginationUrl = `/goods/30/comments?page=${currentPage}`;
  try {
    const { data } = await axios.get(paginationUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addComment = async newComment => {
  try {
    const data = await axios.post(URL, newComment);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default { getComments, addComment };
