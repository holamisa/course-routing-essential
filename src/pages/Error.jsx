import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  // error를 발생시킨 쪽에서 Response로 하면 error.status가 존재한다. object로 던졌으면 error 자체가 해당 데이터다.
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  } else if (error.status === 404) {
    title = 'Not Found!';
    message = 'Could not find resource or page!';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
