import { useState, useEffect } from 'react';
import Form from './components/Form';
import commentsApi from './service/comments-api';
import { v4 as uuidv4 } from 'uuid';
import { Cached as CachedIcon } from '@material-ui/icons/';
import { Pagination } from '@material-ui/lab';
import Container from './components/Container';
import {
  Button,
  List,
  ListItem,
  CircularProgress,
  Card,
  CardContent,
} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginTop: '15px',
    marginBottom: '40px',
  },

  contentWrap: {
    width: '550px',
    wordWrap: 'break-word',
    backgroundColor: 'rgba(150, 147, 245, 0.5)',
  },

  dataList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  pagination: {
    marginBottom: '60px',
  },
});

function App() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);

    // *Запись данных из API в стейт

    commentsApi
      .getComments(currentPage)
      .then(({ data, current_page, last_page }) => {
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setComments(prevComments => {
          return [...prevComments, ...data.data];
        });
      })

      .finally(() => {
        setIsLoading(false);

        currentPage > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
      });
  }, [currentPage]);

  // * Отправка POST-запроса через форму
  const handleFormSubmit = async comment => {
    const newComment = await commentsApi
      .addComment(comment)
      .then(({ config }) => JSON.parse(config.data));
    setComments([newComment, ...comments]);
  };

  // * Подгрузка следующей порции комментариев на страницу при клике на кнопку LOAD MORE
  const handleLoadMoreBtn = () => {
    setCurrentPage(prevPage => {
      return isLoading ? currentPage : prevPage + 1;
    });
  };

  // * Загрузка  данных по выбранной в пагинации странице
  const handlePaginationPage = (e, page) => {
    if (isLoading) {
      return setCurrentPage(currentPage);
    }
    setCurrentPage(page);

    // * Обнуление стейта и добавление данных с выбранной страницы
    if (comments.length) {
      setCurrentPage(page);
      setComments([]);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} />

      <List className={classes.dataList}>
        {comments.map(({ name, text }) => (
          <ListItem key={uuidv4()}>
            <Card>
              <CardContent className={classes.contentWrap}>
                Name: {name}
              </CardContent>
              <CardContent className={classes.contentWrap}>
                Comment: {text}
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {isLoading && <CircularProgress />}

      {!isLoading && currentPage !== totalPages && (
        <Button
          size="medium"
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
          aria-label="load more"
          endIcon={<CachedIcon>send</CachedIcon>}
          onClick={handleLoadMoreBtn}
        >
          Load more
        </Button>
      )}

      {!isLoading && (
        <Pagination
          className={classes.pagination}
          count={totalPages}
          page={currentPage}
          onChange={handlePaginationPage}
          color="primary"
          size="large"
          siblingCount={2}
        />
      )}
    </Container>
  );
}

export default App;
