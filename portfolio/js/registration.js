document.getElementById('registerButton').addEventListener('click', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const form = document.getElementById('registrationForm');
    const formElements = form.elements;
    let isValid = true;
  
    // Проверка заполненности всех полей
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
  
      if (element.required && !element.value) {
        isValid = false;
        element.classList.add('error');
      } else {
        element.classList.remove('error');
      }
    }
  
    // Проверка длины пароля (минимум 8 символов)
    const passwordElement = document.getElementById('password');
    if (passwordElement.value.length < 8) {
      isValid = false;
      passwordElement.classList.add('error');
    } else {
      passwordElement.classList.remove('error');
    }
  
    // Проверка совпадения паролей
    const repeatPassword = document.getElementById('repeatPassword');
    if (repeatPassword.value !== passwordElement.value) {
      isValid = false;
      repeatPassword.classList.add('error');
    } else {
      repeatPassword.classList.remove('error');
    }

    if (isValid) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        localStorage.setItem('userEmail', email);
        //создаю пользователя на сервере
        await fetch(
            "/registration",
            {
                method: 'POST',
                body: JSON.stringify({'name': username, 'email': email, 'password': password}),
                headers: {'Content-Type': 'application/json'}
            }
        ).then(async response => {
            if (!response.ok){
                throw new Error('Ошибка не сервере')
            }else{
                //получаю токен с сервера
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
                    window.location.href = "/registration/confirmEmail";
                }
            }
        }).catch(error => {
            alert('Введен неверный email или пользователь с таким email уже зарегестрирован');
        });
    } else {
      alert('Пожалуйста, проверьте все поля и убедитесь, что пароль содержит минимум 8 символов и пароли совпадают.');
    }
    
  });
  