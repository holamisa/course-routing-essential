import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/Root';
import EventLayout from '../layouts/Event';
import ErrorPage from '../pages/Error';
import HomePage from '../pages/Home';
import EventsPage from '../pages/Events';
import EventDetailPage from '../pages/EventDetail';
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
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: ':id', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':id/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

export default router;
