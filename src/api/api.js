import axios from "axios";

export default function api(path, method, body, role="allowed") {
    return new Promise((resolve) => {
        const requestData = {
            method: method,
            url: "https://service-forum.herokuapp.com/" + path,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken(role),
            },
        };

        axios(requestData)
        .then(res => responseHandler(res, resolve))
        .catch(async err => {

            if (err.response && err.response.status === 401) {
                const response = {
                    status: "login",
                    data: null
                };
                console.log(response);
                return resolve(response);
            }
           
            const response = {
                status: "error",
                data: err
            };

            resolve(response);

        });
    });
}

async function responseHandler(res, resolve) {
    console.log(res);
    if (res.status < 200 || res.status >= 300) {
        const response = {
            status:'error',
            data: res.data,
        };

        return resolve(response);
    }

    const response = {
        status: "ok",
        data: res.data,
    };

    return resolve(response);
}

function getToken(role) {
    const token = localStorage.getItem("token_" + role);
    return "Bearer " + token;
}

export function tokenExists(role) {
    const token = localStorage.getItem("token_" + role);
    if (token) {
      return true;
    }

    return false;
}

export function saveToken(role, token) {
    localStorage.setItem("token_" + role, token);
}

export function removeToken(role) {
    localStorage.removeItem("token_" + role);
}
