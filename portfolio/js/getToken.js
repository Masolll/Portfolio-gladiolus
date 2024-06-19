function getToken(email, password){
    return fetch(
        "/enter",
        {
            method: 'POST',
            body: JSON.stringify({'email': email, 'password': password}),
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => {
        if (!response.ok){
            throw new Error('Ошибка не сервере')
        }else{
            return response.json();
        }
    }).then(json => json.token).catch(error => {
        alert('Введен неверный email или пароль');
    })
}
export {getToken}