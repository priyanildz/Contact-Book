function SearchContact({ query, setQuery, suggestions = [] }) {
  return (
    <section className="panel search-panel">
      <h2>Search Contacts</h2>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name, email, or phone"
      />
      {query.trim() && suggestions.length > 0 && (
        <div className="suggestions">
          <p>Suggestions</p>
          <ul>
            {suggestions.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default SearchContact;
