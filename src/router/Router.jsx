import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/Root';
import EventLayout from '../layouts/Event';
import ErrorPage from '../pages/Error';
import HomePage from '../pages/Home';
import EventsPage, { loader as eventsLoader } from '../pages/Events';
import EventDetailPage, {
  loader as eventDetailLoader,
} from '../pages/EventDetail';
import NewEventPage from '../pages/NewEvent';
import EditEventPage from '../pages/EditEvent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader, // loader는 해당 페이지가 접근 될려는 즉시 실행이 된다. 결과를 받으면 그때 element가 렌더링된다.
          },
          {
            path: ':id',
            element: <EventDetailPage />,
            loader: eventDetailLoader,
          },
          { path: 'new', element: <NewEventPage /> },
          { path: ':id/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

export default router;
