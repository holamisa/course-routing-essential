import {
  useRouteLoaderData,
  useLoaderData,
  useParams,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';
import { Suspense } from 'react';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

async function loadEvent(id) {
  const response = await fetch(`http://localhost:3030/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      },
    );
  }

  // return response;
  const resData = await response.json();
  return resData.event;
}

async function loadEvents() {
  const response = await fetch('http://localhost:3030/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      },
    );
  }

  const resData = await response.json();
  return resData.events;
}

// router에서 loader 호출 시 자동으로 request, params object를 보내준다.
export async function loader({ request, params }) {
  const { id } = params;

  return defer({
    // event: loadEvent(id),
    // events: loadEvents(),
    // await로 불러올 데이터 순서 정할 수 있다.
    event: await loadEvent(id),
    events: loadEvents(),
  });
}
// export async function loader({ request, params }) {
//   // request.url
//   const { id } = params;
//   const response = await fetch(`http://localhost:3030/events/${id}`);

//   if (!response.ok) {
//     throw json(
//       { message: `Could not fetch ${id}.` },
//       {
//         status: 500,
//       },
//     );
//   }

//   const resData = await response.json();
//   return resData;
// }

export async function action({ request, params }) {
  const { id } = params;
  const response = await fetch(`http://localhost:3030/events/${id}`, {
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
  const { event, events } = data;

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      {/* 두개 이상 호출 필요 시 이렇게 진행해도됨. 각각 로딩 된다. */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;
