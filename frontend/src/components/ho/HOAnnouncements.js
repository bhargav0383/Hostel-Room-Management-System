import React, { useState, useEffect } from 'react';
import axios from './axios';
import { BsPencilSquare } from 'react-icons/bs';

export default function HOAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [editAnnouncement, setEditAnnouncement] = useState({});
    const [newAnnouncement, setNewAnnouncement] = useState({})
    useEffect(() => {
        var id = localStorage.getItem("userId");
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
        const id=editAnnouncement.id;
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
    
    return (
        <>
        <div className="container">
            <h1 className="mb-4 text-center">My Announcements</h1>
            <div className='d-flex justify-content-end mb-3'>
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createAnnouncementModal">Create New Announcement</button>
            </div>

            {announcements.length === 0 && (
                <div className="alert alert-info text-center mx-auto my-3 w-50" role="alert">
                    No announcements to show!!!
                </div>
            )}

            {announcements.map((announcement) => (
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
                ))
            }

            <div class="modal fade" id="editAnnouncementModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit announcement</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
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
                    <label htmlFor="content" className="form-label">Content</label>
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        value={editAnnouncement.content}
                        onChange={(e) => setEditAnnouncement(prevState => ({
                            ...prevState,
                            content: e.target.value
                        }))}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input
                        type="text"
                        className="form-control"
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={updateAnnouncement}>Save changes</button>
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
        </>
    );
}
