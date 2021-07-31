import { useState, useEffect } from 'react';
import Form from './components/Form';
// import Container from './components/Container';
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
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginTop: '15px',
    marginBottom: '40px',
  },

  contentWrap: {
    backgroundColor: 'rgba(150, 147, 245, 0.5)',
    padding: '10px',
    width: '400px',
    '&:last-child': {
      padding: '10px',
    },
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
        .then(({ data, current_page, last_page }) => {
          setCurrentPage(current_page);
          setTotalPages(last_page);
          setComments(prevComments => [...prevComments, ...data.data]);

          currentPage === totalPages &&
            toast.info(
              'Oops ... Pages run out. There is nowhere to scroll further',
            );
        })

        .finally(() => {
          setIsLoading(false);

          currentPage > 1 &&
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
        });
    };

    fetchComments();
  }, [currentPage, totalPages]);

  const handleFormSubmit = async comment => {
    const newComment = await commentsApi
      .addComment(comment)
      .then(({ config }) => JSON.parse(config.data));
    setComments([newComment, ...comments]);
  };

  const handleLoadMoreBtn = () => {
    setCurrentPage(prevPage => {
      return isLoading ? currentPage : prevPage + 1;
    });
  };

  const handlePaginationPage = (e, page) => {
    if (isLoading) {
      return setCurrentPage(currentPage);
    }
    setCurrentPage(page);
    if (comments.length) {
      setComments(
        prevComments => prevComments.splice(0, prevComments.length),
        comments,
      );
      console.log(e);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} />

      {!isLoading && (
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
      )}

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
      <ToastContainer autoClose={4000} transition={Zoom} />
    </Container>
  );
}

export default App;
