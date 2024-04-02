import { useRouteLoaderData, useLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage() {
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail');
  const { event } = data;

  return <EventForm event={event} />;
}

export default EditEventPage;
