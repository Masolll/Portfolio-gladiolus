let name = document.querySelector("#name");
let email = document.querySelector('#phone');
let password = document.querySelector('#password');
let repeatPassword = document.querySelector('#repeat-password');
let buttonRegistr = document.querySelector('#registr');

buttonRegistr.addEventListener('click', async ()=>{
    const nameUser = name.value;
    const emailUser = email.value;
    const passwordUser = password.value;
    const repeatPasswordUser = repeatPassword.value;
    console.log('Script start');
    if (passwordUser === repeatPasswordUser){
        //отправляю запрос на сервер
        await fetch(
            "/registration",
            {
                method: 'POST',
                body: JSON.stringify({'name': nameUser, 'email': emailUser, 'password': passwordUser}),
                headers: {'Content-Type': 'application/json'}
            }
        ).then(response =>{
            if (!response.ok){
                throw new Error("Не пройдена валидация или пользователь с таким email уже существует"+response.status);
            }
            console.log('Пользователь успешно создан!');
        }).catch(err => console.log(err))
    }else{
        confirm(`пароли не совпадают`);
        //пока перекидывает на страницу с смс, это нужно будет исправить потом
    }
})

