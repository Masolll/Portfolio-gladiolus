let code;
document.addEventListener('DOMContentLoaded', async function() {
    const emailPreview = document.getElementById('emailPreview');
    const userEmail = localStorage.getItem('userEmail');
    // Отображаем email адрес пользователя
    emailPreview.innerText = userEmail || '******';
    code = await sendEmail();
  });
async function sendEmail(){
    const sendCode = await fetch(
        "/email",
        {
            method: 'POST',
            body: JSON.stringify({'email': localStorage.getItem('userEmail')}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if(res.status === 200){
                return res.json()
            }else{
                throw new Error();
            }

        }).catch(error => {
            console.log(error);
        })
    return sendCode;
}

confirmPasswordButton = document.querySelector('.confirmPasswordButton');
confirmPasswordButton.onclick = function (){
    const inputCode = document.getElementById('userCodeInput').value;
    if (inputCode == code){
        document.cookie = "token=" + localStorage.getItem('bearerToken')+";path=/";
        localStorage.removeItem('bearerToken');
        window.location.href = '/portfolio/description'
    }else{
        alert('Введен неверный код')
    }
}