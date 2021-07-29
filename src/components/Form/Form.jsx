import { useState } from 'react';
import Button from '../Button';
import './Form.scss';
const Form = ({ onSubmit }) => {
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
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <input
          onChange={handleInputName}
          type="text"
          name="name"
          className="form__input--name"
          value={name}
          required
          placeholder="Введите имя"
        />
      </label>

      <label>
        <textarea
          onChange={handleInputComment}
          type="text"
          name="comment"
          className="form__input--comment"
          value={text}
          required
          placeholder="Оставьте комментарий"
        ></textarea>
      </label>

      <Button className="form__buttonSubmit" type="submit">
        Отправить
      </Button>
    </form>
  );
};

export default Form;
