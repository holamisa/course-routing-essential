import { Form, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  // Form --> router에서 제공하는 컴포넌트. action 함수 실행 시 값들 호출 가능해진다. 대신 필요한 항목마다 name 어트리뷰트가 존재해야한다.
  // router에서 다른 path의 action을 실행하고 싶으면 action 속성 사용하면 된다.
  // <Form method="post" action="/other-path" className={classes.form}>
  return (
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={event ? event.title : ''}
            required
          />
        </label>
      </p>
      <p>
        <label htmlFor="image">
          Image
          <input
            id="image"
            type="url"
            name="image"
            defaultValue={event ? event.image : ''}
            required
          />
        </label>
      </p>
      <p>
        <label htmlFor="date">
          Date
          <input
            id="date"
            type="date"
            name="date"
            defaultValue={event ? event.date : ''}
            required
          />
        </label>
      </p>
      <p>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            rows="5"
            defaultValue={event ? event.description : ''}
            required
          />
        </label>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
