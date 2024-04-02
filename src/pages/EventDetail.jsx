import {
  useRouteLoaderData,
  useLoaderData,
  useParams,
  json,
  redirect,
} from 'react-router-dom';

import EventItem from '../components/EventItem';

// router에서 loader 호출 시 자동으로 request, params object를 보내준다.
export async function loader({ request, params }) {
  // request.url
  const { id } = params;
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: `Could not fetch ${id}.` },
      {
        status: 500,
      },
    );
  }

  const resData = await response.json();
  return resData;
}

export async function action({ request, params }) {
  const { id } = params;
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: `Could not delete ${id}.` },
      {
        status: 500,
      },
    );
  }

  return redirect('/events');
}

function EventDetailPage() {
  // const { id } = useParams();
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail');
  const { event } = data;

  return <EventItem event={event} />;
}

export default EventDetailPage;
