export const toastPromise = (url, body) => {

    return (
        new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json().then((json) => resolve(json))
                    } else {
                        return response.json().then(error => reject(error))
                    }
                })
        })
    )
}