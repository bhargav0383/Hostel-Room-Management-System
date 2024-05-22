import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = ({ id }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [filterBy, setFilterBy] = useState('All');

  // Function to calculate time elapsed since creation
  const calculateTimeElapsed = (createdAt, duration) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const elapsedTime = currentDate - createdDate;
    const remainingTime = duration * 24 * 60 * 60 * 1000 - elapsedTime;
    const fraction = elapsedTime / (duration * 24 * 60 * 60 * 1000);
    return { elapsedTime, remainingTime, fraction };
  };

  useEffect(() => {
    var id=localStorage.getItem("userId");
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/announcements/${id}`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [filterBy, announcements]);

  const filterAnnouncements = () => {
    let filtered = announcements;
    if (filterBy === 'HR' || filterBy === 'HO') {
      filtered = filtered.filter(announcement => announcement.id.startsWith(filterBy.toLowerCase() === 'ho' ? 'office.' : filterBy.toLowerCase()));
    } else if (filterBy === 'New' || filterBy === 'EndingSoon') {
      filtered = filtered.filter(announcement => {
        const { fraction } = calculateTimeElapsed(announcement.created_at, announcement.duration);
        return filterBy === 'New' ? fraction <= 1 / 5 : fraction >= 4 / 5;
      });
    }
    setFilteredAnnouncements(filtered);
  };

  const handleFilter = (filter) => {
    setFilterBy(filter);
  };

  return (
    <div className='container'>
      <h1 className="mb-4 text-center">Announcements</h1>
      <div className='d-flex justify-content-end'>
        <div className="btn-group mb-3" role="group">
          <button type="button" className={`btn btn-outline-primary ${filterBy === 'All' ? 'active' : ''}`} onClick={() => handleFilter('All')}>All</button>
          <button type="button" className={`btn btn-outline-secondary ${filterBy === 'HR' ? 'active' : ''}`} onClick={() => handleFilter('HR')}>HR</button>
          <button type="button" className={`btn btn-outline-dark ${filterBy === 'HO' ? 'active' : ''}`} onClick={() => handleFilter('HO')}>HO</button>
          <button type="button" className={`btn btn-outline-success ${filterBy === 'New' ? 'active' : ''}`} onClick={() => handleFilter('New')}>New</button>
          <button type="button" className={`btn btn-outline-danger ${filterBy === 'EndingSoon' ? 'active' : ''}`} onClick={() => handleFilter('EndingSoon')}>Ending Soon</button>
        </div>
      </div>
      {filteredAnnouncements.length === 0 ? (
        <div className="alert alert-info text-center mx-auto my-3 w-50" role="alert">
          No announcements to show.
        </div>
      ) : (
        filteredAnnouncements.map((announcement, index) => {
          const { elapsedTime, fraction } = calculateTimeElapsed(announcement.created_at, announcement.duration);

          let badgeColor = 'primary';
          if (fraction <= 1 / 5) {
            badgeColor = 'success'; // New
          } else if (fraction >= 4 / 5) {
            badgeColor = 'danger'; // Alert
          }

          return (
            <div key={index} className={`alert alert-${badgeColor}`} role="alert">
              <div className="d-flex align-items-center">
                {announcement.id.startsWith('hr.') && (
                  <span className="badge bg-secondary me-2">From HR</span>
                )}
                {announcement.id.startsWith('office.') && (
                  <span className="badge bg-dark me-2">From HO</span>
                )}
                <h5 className="alert-heading">{announcement.title}</h5>
                {fraction <= 1 / 5 && (
                  <span className="badge bg-success ms-auto">New</span>
                )}
                {fraction >= 4 / 5 && (
                  <span className="badge bg-danger ms-auto">Ending Soon</span>
                )}
              </div>
              <p>{announcement.content}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Announcements;
