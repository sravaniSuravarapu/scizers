import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUsers(data.results);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="App container">
      <h1 className="text-center mt-5 mb-4 ">scizers</h1>
      {error && <p className="text-danger">Error: {error}</p>}
     <div className='col-md-4 col-12'> <input
        type="text"
        className="form-control mb-4 "
        placeholder="Search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      /></div>
      <div className="pagination mt-5">
        <button className="btn btn-primary mr-2" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row d-flex justify-content-center items-center">
          {filteredUsers.map(user => (
            <div key={user.name} className="col-lg-3 col-md-4 col-8 gap-2 py-4">
              <div className="card" style={{ backgroundColor: user.hair_color }}>
                <img className="card-img-top" src={`https://picsum.photos/200/300?random=${user.name}`} alt="user" width={"300px"} height={"300px"} />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">Hair color: {user.hair_color}</p>
                  <p className="card-text">Skin color: {user.skin_color}</p>
                  <p className="card-text">Gender: {user.gender}</p>
                  <p className="card-text">Count of vehicles: {user.vehicles.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default App;
