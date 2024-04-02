import { useFetcher, Form } from 'react-router-dom';

import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  // 그냥 Form 컴포넌트를 사용하면 앱의 모든 컴포넌트에 action을 추가해줘야한다. Navi에 들어가있으니.
  // 따라서 route에 연결안된 form을 동작할려면 useFetcher를 사용해야한다.
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button type="submit">Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
