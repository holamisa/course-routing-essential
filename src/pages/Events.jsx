// import { useEffect, useState } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

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

  // return response;
  const resData = await response.json();
  return resData.events;
}

export function loader() {
  // defer를 사용하여 페이지 로딩 후에 데이터 호출도 가능하다.
  return defer({
    events: loadEvents(),
  });
}

// export async function loader() {
//   const response = await fetch('http://localhost:3030/events');

//   if (!response.ok) {
//     // return { isError: true, message: 'Could not fetch events.' };
//     // throw new Error('Could not fetch events.');

//     // Response 던지는거 추천함
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//     //   status: 500,
//     // });
//     // json은 new Response 수작업하는것 보다 더 간소화된 방식
//     throw json(
//       { message: 'Could not fetch events.' },
//       {
//         status: 500,
//       },
//     );
//   }

//   const resData = await response.json();
//   // 받아온 데이터를는 EventPage에서 랜더링 하는 모든 하위 컴포넌트에 각자 사용 가능하다. 상위 컴포넌트는 사용 불가.
//   return resData;
// }

/// / router useLoader version
function EventsPage() {
  const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const { events } = data;
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

/// / V2 useEffect fetch version
// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:3030/events');

//       if (!response.ok) {
//         setError('Fetching events failed.');
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

export default EventsPage;
