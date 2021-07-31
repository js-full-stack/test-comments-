import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Container: {
    maxWidth: '1200px',
    padding: '0 15px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Container = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.Container}>{children}</div>;
};

export default Container;
