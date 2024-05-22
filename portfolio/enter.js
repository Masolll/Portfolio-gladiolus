document.getElementById('enterButton').addEventListener('click', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const token = await fetch(
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
    }).catch(error => {
        alert('Введен неверный email или пароль');
    })
    if (token){
        const bearerToken = 'Bearer ' + token.token
        localStorage.setItem('token', bearerToken);
        await fetch(
            "/enter/confirmEmail",
            {
                method: 'GET',
                headers: {
                    'Authorization': bearerToken
                }
            }
        ).then(response => {
            if (!response.ok){
                throw new Error('error');
            }
            return response.text();
        }).then(html => {
            document.body.innerHTML = html
            }
        ).catch(error => {
            alert('ошибка при передаче токена на сервер')
        })
    }
});
    