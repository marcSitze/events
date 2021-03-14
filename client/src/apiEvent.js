import { API } from './config';
import { getToken } from './auth';

export const read = (userId, token) => {
    return fetch(`${API}/dashboard`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const getEvents = () => {
    const token = getToken();
    return fetch (`${API}/events`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));
};

export const getMyEvents = () => {
    const token = getToken();
    return fetch(`${API}/dashboard`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}

export const createEvent = event => {
    const token = getToken();
    return fetch(`${API}/events`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));
};

export const getParticipants = (eventId) => {
    const token = getToken();
    return fetch(`${API}/events/${eventId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));
};

export const participateEvent = (motivation, eventId) => {
    const token = getToken();
    return fetch(`${API}/events/${eventId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({motivation})
    })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const deleteEvent = (eventId) => {
    const token = getToken();
    return fetch(`${API}/dashboard/events/${eventId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}