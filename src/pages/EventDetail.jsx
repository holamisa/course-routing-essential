import { useLoaderData, useParams, json } from 'react-router-dom';

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

function EventDetailPage() {
  // const { id } = useParams();
  const data = useLoaderData();
  const { event } = data;

  return <EventItem event={event} />;
}

export default EventDetailPage;
