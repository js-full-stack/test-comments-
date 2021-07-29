import { useState, useEffect } from 'react';
import Form from './components/Form';
import Container from './components/Container';
import commentsApi from './services/comments-api';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchComments = () => {
      commentsApi.getComments(currentPage).then(({ data }) => {
        setComments(data);
      });
    };
    fetchComments();
  }, [currentPage]);

  const handlePaginationPages = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = async comment => {
    const newComment = await commentsApi
      .addComment(comment)
      .then(({ config }) => JSON.parse(config.data));
    // const parsedComments = JSON.parse(newComment);

    // console.log(parsedComments);
    setComments([newComment, ...comments]);
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} />
      <ul className="data-list">
        {comments.map(({ name, text, id }) => (
          <li key={uuidv4()}>
            <span className="data-list__name">Имя: {name}</span>
            <span className="data-list__comment"></span> Комментарий:
            {text}
          </li>
        ))}
      </ul>
      (
      {comments && (
        <button type="button" onClick={handlePaginationPages}>
          show more
        </button>
      )}
      )
    </Container>
  );
}

export default App;

//  const newComment = await axios
//    .post(URL, comment)
//    .then(data => JSON.parse(data.config.data));
//  console.log(newComment);
