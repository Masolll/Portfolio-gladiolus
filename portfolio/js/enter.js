document.getElementById('enterButton').addEventListener('click', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    localStorage.setItem('userEmail', email);
    const password = document.getElementById('password').value;
    const token =  await fetch(
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
    if (token){
        const bearerToken = 'Bearer ' + token
        document.cookie = "token=" + bearerToken;
        window.location.href = "/enter/confirmEmail";
    }
});
    