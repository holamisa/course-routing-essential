import { useParams } from 'react-router-dom';

function EditEventPage() {
  const { id } = useParams();

  return <h1>Edit Event Page {id}</h1>;
}

export default EditEventPage;
