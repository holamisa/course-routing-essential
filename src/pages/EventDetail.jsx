import { useParams } from 'react-router-dom';

function EventDetailPage() {
  const { id } = useParams();

  return <h1>Event Detail Page {id}</h1>;
}

export default EventDetailPage;
