let name = document.querySelector("#name");
let phone = document.querySelector('#phone');
let password = document.querySelector('#password');
let repeatPassword = document.querySelector('#repeat-password');
let buttonRegistr = document.querySelector('#registr');

buttonRegistr.addEventListener('click', async ()=>{
    const nameUser = name.value;
    const phoneUser = phone.value;
    const passwordUser = password.value;
    const repeatPasswordUser = repeatPassword.value;

    if (passwordUser === repeatPasswordUser){
        //отправляю запрос на сервер
        await fetch(
            "http://localhost:3000/users",
            {
                method: 'POST',
                body: JSON.stringify({'name': nameUser, 'phone': phoneUser, 'password': passwordUser}),
                headers: {'Content-Type': 'application/json'}
            }
        ).then(p => console.log('пользователь успешно создан')).catch(err => console.log('возникла ошибка'))
    }else{
        confirm(`пароли не совпадают`);
        //пока перекидывает на страницу с смс, это нужно будет исправить потом
    }
})

