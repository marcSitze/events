import { API } from '../config';

export const register = user => {
    return fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));
};

export const login = user => {
    return fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));
};

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', data);
        next();
    }
}

export const logout = () => {
    const token = getToken();

    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        // next();
        return fetch(`${API}/logout`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response)
        .catch(err => console.error(err));
    }
};

export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false;
    }
    if(localStorage.getItem('jwt') && localStorage.getItem('jwt') !== 'undefined') {
        return true;
    }else{
        return false;
    }
};

export const getToken = () => {
    if(typeof window !== 'undefined') {
        return localStorage.getItem('jwt');
    }
}