function ContactList({ contacts, onEdit, onDelete, loading }) {
  return (
    <section className="panel list-panel">
      <div className="list-head">
        <h2>Contact List</h2>
        <span>{contacts.length} total</span>
      </div>

      {loading ? (
        <p className="state-text">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="state-text">No contacts found.</p>
      ) : (
        <ul className="contact-grid">
          {contacts.map((contact) => (
            <li className="contact-card" key={contact._id}>
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <div className="card-actions">
                <button onClick={() => onEdit(contact)}>Edit</button>
                <button className="danger" onClick={() => onDelete(contact._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ContactList;
