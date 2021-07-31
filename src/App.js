import { useState, useEffect } from 'react';
import Form from './components/Form';
// import Container from './components/Container';
import commentsApi from './service/comments-api';
import { v4 as uuidv4 } from 'uuid';
import { Cached as CachedIcon } from '@material-ui/icons/';
import { Pagination } from '@material-ui/lab';
import {
  Grid,
  Container,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  CircularProgress,
  ListItemAvatar,
} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginTop: '15px',
    marginBottom: '40px',
  },
  selectedPage: {
    fontWeight: 700,
    color: 'white',
    backgroundColor: 'orange',
  },
  spinnerWrapper: {
    height: '25px',
    marginTop: '25px',
    marginBottom: '25px',
  },
  userName: {
    marginLeft: '15px',
    marginRight: '15px',
  },
  userComment: {
    marginRight: '20px',
  },
  dataListItem: {
    width: '400px',
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
          setComments(data.data);
          setCurrentPage(current_page);
          setTotalPages(last_page);
        })
        .finally(() => setIsLoading(false));
    };
    fetchComments();
  }, [currentPage]);

  const handleLoadMoreBtn = () => {
    setCurrentPage(prevPage => {
      return isLoading ? currentPage : prevPage + 1;
    });
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
    <>
      <Container fixed>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Form onSubmit={handleFormSubmit} />
          <List className={classes.dataList}>
            {comments.map(({ name, text }) => (
              <>
                <ListItem className={classes.dataListItem} key={uuidv4()}>
                  Имя: <span className={classes.userName}> {name}</span>
                </ListItem>
                <ListItem className={classes.dataListItem} key={uuidv4()}>
                  <span className={classes.userComment}>
                    Комментарий: {text}
                  </span>
                </ListItem>
              </>
            ))}
          </List>
          <div className={classes.spinnerWrapper}>
            {isLoading && <CircularProgress />}
          </div>

          {currentPage !== totalPages && (
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

          <Pagination
            className={classes.pagination}
            count={totalPages}
            page={currentPage}
            onChange={handlePaginationPage}
            color="primary"
            size="large"
            siblingCount={2}
          />
        </Grid>
      </Container>
    </>
  );
}

export default App;
