import { useNavigate } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="title">
          Title
          <input id="title" type="text" name="title" required />
        </label>
      </p>
      <p>
        <label htmlFor="image">
          Image
          <input id="image" type="url" name="image" required />
        </label>
      </p>
      <p>
        <label htmlFor="date">
          Date
          <input id="date" type="date" name="date" required />
        </label>
      </p>
      <p>
        <label htmlFor="description">
          Description
          <textarea id="description" name="description" rows="5" required />
        </label>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default EventForm;
