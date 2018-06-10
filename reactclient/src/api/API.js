const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000';

const headers = {
    'Accept': 'application/json'
};

export const imgFile = (payload) =>
    fetch(`${api}/img`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


        export const sendFile = (payload) =>
            fetch(`${api}/img`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify(payload)
            }).then(res => {
                console.log(res);
                return res.json();
            })
                .catch(error => {
                    console.log("This is error");
                    return error;
                });
