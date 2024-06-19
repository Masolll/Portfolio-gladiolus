import {getToken} from "/js/getToken.js";

document.getElementById('enterButton').addEventListener('click', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    localStorage.setItem('userEmail', email);
    const password = document.getElementById('password').value;
    const token =  await getToken(email, password);
    if (token){
        const bearerToken = 'Bearer ' + token
        localStorage.setItem('bearerToken', bearerToken);
        window.location.href = "/enter/confirmEmail";
    }
});
    