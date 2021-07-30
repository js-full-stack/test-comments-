import { useState, useEffect } from 'react';
import Form from './components/Form';
// import Container from './components/Container';
import commentsApi from './service/comments-api';
import { v4 as uuidv4 } from 'uuid';
import { Cached as CachedIcon } from '@material-ui/icons/';
import { Pagination } from '@material-ui/lab';

import {
  Grid,
  Button,
  List,
  ListItem,
  CircularProgress,
} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  selectedPage: {
    fontWeight: 700,
    color: 'white',
    backgroundColor: 'orange',
  },
});

function App() {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchComments = () => {
      commentsApi
        .getComments(currentPage)
        .then(({ data, countPages, current_page }) => {
          setComments(data.data);
          setCurrentPage(current_page);
          setTotalPages(countPages);
        })
        .finally(() => setIsLoading(false));
    };
    fetchComments();
  }, [currentPage]);

  const handleLoadMoreBtn = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePaginationPage = (e, page) => {
    setCurrentPage(page);
  };

  const handleFormSubmit = async comment => {
    const newComment = await commentsApi
      .addComment(comment)
      .then(({ config }) => JSON.parse(config.data));
    setComments([newComment, ...comments]);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Form onSubmit={handleFormSubmit} />
      <List className="data-list">
        {comments.map(({ name, text }) => (
          <ListItem key={uuidv4()}>
            <span className="data-list__name">Имя: {name}</span>
            <span className="data-list__comment"></span> Комментарий:
            {text}
          </ListItem>
        ))}
      </List>
      {comments && (
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
      {isLoading && <CircularProgress />}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePaginationPage}
        color="primary"
        size="large"
        siblingCount={2}
      />
      ;
    </Grid>
  );
}

export default App;
