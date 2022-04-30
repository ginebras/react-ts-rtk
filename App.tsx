import * as React from 'react';
import {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from './services/contactsApi';
import './style.css';

export default function App() {
  const { data, isFetching, error, isSuccess, isLoading } = useContactsQuery();

  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const handleAdd = async () => {
    await addContact({ id: '19', name: 'Bianqu', email: 'bianqui@gmail.com' });
  };

  const handleUpdate = async (id) => {
    await updateContact({ id: '1', title: 'ricardo' });
  };

  const handleDelete = async (id) => {
    await deleteContact(12);
  };

  return (
    <div>
      <h1>React-redux toolkit RTK Query</h1>

      <button className="btn primary" onClick={handleAdd}>
        Add contact
      </button>

      {isLoading && <h2>Loading</h2>}
      {isFetching && <h2>Fetching</h2>}
      {isSuccess && <h2>Success</h2>}
      {error && <h2>Error,something went wrong</h2>}

      {data && (
        <div className="data-container">
          {data.map((data, index) => (
            <div className="data" key={index}>
              <span>{data.title}</span>
              <ContactDetails id={data.id} />
              <button
                onClick={() => handleUpdate(data.id)}
                className="btn secondary"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(data.id)}
                className="btn triple"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ContactDetails = ({ id }: { id: string }) => {
  const { data } = useContactQuery(id);

  return (
    <pre
      style={{
        backgroundColor: 'teal',
        padding: '1rem',
        borderRadius: '10px',
        overflow: 'auto',
      }}
    >
      {JSON.stringify(data, undefined, 2)}
    </pre>
  );
};
