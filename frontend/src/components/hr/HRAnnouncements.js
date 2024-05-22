import React, { useState, useEffect } from 'react';
import axios from './axios';
import { BsPencilSquare } from 'react-icons/bs';

export default function StudentHomePage() {
    const [announcements, setAnnouncements] = useState([]);
    const [editAnnouncement, setEditAnnouncement] = useState({});
    const [newAnnouncement, setNewAnnouncement] = useState({});
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        var id = localStorage.getItem('userId');
        axios.get(`/hr_announcements/${id}`)
            .then((response) => {
                console.log(response.data);
                setAnnouncements(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    const updateAnnouncement = () => {
        const id = editAnnouncement.id;
        axios.put(`/hr_announcements/${id}`, editAnnouncement)
            .then((response) => {
                console.log(response.data);
                //refresh the page
                window.location.reload();
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    const filteredAnnouncements = () => {
        if (filter === 'mine') {
            return announcements.filter(announcement => announcement.id === localStorage.getItem('userId'));
        } else if (filter === 'others') {
            return announcements.filter(announcement => announcement.id !== localStorage.getItem('userId'));
        } else {
            return announcements;
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4 text-center">Announcements</h1>
            <div className='d-flex justify-content-end'>
                <div className="btn-group mb-3">
                    <button type="button" className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>All</button>
                    <button type="button" className={`btn ${filter === 'mine' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('mine')}>My</button>
                    <button type="button" className={`btn ${filter === 'others' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('others')}>HO</button>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createAnnouncementModal">Create New Announcement</button>
                </div>
            </div>

            {filteredAnnouncements().length === 0 && (
                <div className="alert alert-info text-center mx-auto my-3 w-50" role="alert">
                    No announcements to show!!!
                </div>
            )}

            {filteredAnnouncements().map((announcement) => (
                <div key={`${announcement.id}-${announcement.created_at}`} className="card mb-3 bg-light">
                    <div className="card-body d-flex justify-content-between align-items-start">
                        <div>
                            <h5 className="card-title">{announcement.title}</h5>
                            <p className="card-text">{announcement.content}</p>
                        </div>
                        {announcement.id === localStorage.getItem('userId') && (
                            <button
                                onClick={() => {
                                    setEditAnnouncement({
                                        id: announcement.id,
                                        title: announcement.title,
                                        content: announcement.content,
                                        duration: announcement.duration,
                                        created_at: announcement.created_at
                                    });
                                    console.log(editAnnouncement);
                                }}
                                className="btn btn-dark"
                                data-bs-toggle="modal"
                                data-bs-target="#editAnnouncementModal"
                            >   
                                <BsPencilSquare />
                            </button>
                        )}
                    </div>
                </div>
            
            ))}

            <div className="modal fade" id="editAnnouncementModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Announcement</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label"><strong>Title : </strong></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={editAnnouncement.title}
                                        onChange={(e) => setEditAnnouncement(prevState => ({
                                            ...prevState,
                                            title: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label"><strong>Content : </strong></label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="content"
                                        value={editAnnouncement.content}
                                        onChange={(e) => setEditAnnouncement(prevState => ({
                                            ...prevState,
                                            content: e.target.value
                                        }))}
                                        rows={4}
                                    />
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="duration" className="form-label me-3"><strong>Duration : </strong></label>
                                    <input
                                        type="number"
                                        className="form-control w-25"
                                        id="duration"
                                        value={editAnnouncement.duration}
                                        onChange={(e) => setEditAnnouncement(prevState => ({
                                            ...prevState,
                                            duration: e.target.value
                                        }))}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={updateAnnouncement}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="createAnnouncementModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create New Announcement</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label"><strong>Title : </strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={newAnnouncement.title}
                                    onChange={(e) => setNewAnnouncement(prevState => ({
                                        ...prevState,
                                        title: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label"><strong>Content : </strong></label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="content"
                                    value={newAnnouncement.content}
                                    onChange={(e) => setNewAnnouncement(prevState => ({
                                        ...prevState,
                                        content: e.target.value
                                    }))}
                                    rows={4}
                                />
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <label htmlFor="duration" className="form-label me-3"><strong>Duration : </strong></label>
                                <input
                                    type="number"
                                    className="form-control w-25"
                                    id="duration"
                                    value={newAnnouncement.duration}
                                    onChange={(e) => setNewAnnouncement(prevState => ({
                                        ...prevState,
                                        duration: e.target.value
                                    }))}
                                />
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => {
                                    // insert id into newAnnouncement
                                    var id = localStorage.getItem('userId');
                                    console.log(newAnnouncement)
                                    var temp = newAnnouncement;
                                    temp.id = id;
                                    setNewAnnouncement(prevState => ({
                                        ...prevState,
                                        id: id
                                    }));
                                    axios.post('/hr_announcements', temp)
                                        .then((response) => {
                                            console.log(response.data);
                                            //refresh the page
                                            window.location.reload();
                                        })
                                        .catch((error) => {
                                            console.error('There was an error!', error);
                                        });
                                }}>
                                    Create Announcement
                                </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
