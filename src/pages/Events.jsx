import { Link } from 'react-router-dom';

const DUMMY_EVENT = [
  {
    id: 'dummy-event-1',
    title: 'Dummy Event 1',
    date: '2020-01-01',
    image: 'https://picsum.photos/200',
  },
  {
    id: 'dummy-event-2',
    title: 'Dummy Event 2',
    date: '2020-01-02',
    image: 'https://picsum.photos/300',
  },
  {
    id: 'dummy-event-3',
    title: 'Dummy Event 3',
    date: '2020-01-03',
    image: 'https://picsum.photos/400',
  },
];
function EventsPage() {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {DUMMY_EVENT.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
