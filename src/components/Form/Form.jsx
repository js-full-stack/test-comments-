import { useState } from 'react';
import { Button } from '@material-ui/core/';
import { Send as SendIcon } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputLabel } from '@material-ui/core/';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginTop: '30px',
  },
  input: {
    marginBottom: '15px',
    width: '320px',
  },
  button: {
    marginBottom: '10px',
    width: '120px',
  },
});

const Form = ({ onSubmit }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newComment = {
      name,
      text,
    };
    onSubmit(newComment);
    setName('');
    setText('');
  };

  const handleInputName = e => {
    setName(e.target.value);
  };

  const handleInputComment = e => {
    setText(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputLabel>
        <TextField
          onChange={handleInputName}
          type="text"
          name="name"
          className={classes.input}
          required
          placeholder="Input you name"
          label="Name"
          aria-labelledby="user name"
          variant="outlined"
          value={name}
          size="medium"
        />
      </InputLabel>

      <InputLabel>
        <TextField
          onChange={handleInputComment}
          type="text"
          name="comment"
          className={classes.input}
          value={text}
          required
          placeholder="Input your comment"
          id="outlined-multiline-static"
          label="Comment"
          aria-labelledby="user comment"
          multiline
          rows={4}
          variant="outlined"
        />
      </InputLabel>
      <Button
        type="submit"
        aria-label="send comment"
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        endIcon={<SendIcon>send</SendIcon>}
      >
        Send
      </Button>
    </form>
  );
};

export default Form;
