const saveButton = document.querySelector('.save');
const cancelButton = document.querySelector('.cancel');
const checkboxM = document.querySelector('.custom-checkbox');
const checkboxW = document.querySelector('.custom-checkbox1');
checkboxM.onclick = function (){
    checkboxM.checked = true;
    checkboxW.checked = false;
}
checkboxW.onclick = function (){
    checkboxW.checked = true;
    checkboxM.checked = false;
}
cancelButton.onclick = function (){
    window.location.href = '/portfolio/contacts'
}
saveButton.onclick = function (evt){
    evt.preventDefault();
    let gender = "";
    if (checkboxM.checked){
        gender = 'm'
    }else if(checkboxW.checked){
        gender = 'w'
    }
    let age=document.getElementById('age').value;
    let phone = document.getElementById('phone-number').value;
    let street = document.getElementById('street-address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let email = document.getElementById('email').value;
    let vkLink = document.getElementById('vk-link').value;
    let tiktokLink = document.getElementById('tiktok-link').value;
    let githubLink = document.getElementById('github-link').value;
    let telegramLink = document.getElementById('telegram-link').value;
    fetch(
        "/portfolio",
        {
            method: 'PUT',
            body: JSON.stringify({
                contacts: {
                    age: age,
                    phone: phone,
                    email: email,
                    gender: gender,
                    address: {
                        street: street,
                        city: city,
                        state: state
                    },
                    socialList: {
                        vk: vkLink,
                        tiktok: tiktokLink,
                        github: githubLink,
                        telegram: telegramLink
                    }
                }
            }),
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => {
        if (response.ok){
            window.location.href='/portfolio/contacts'
        }else{
            throw new Error();
        }
    }).catch(error => console.log('произошла ошибка'))

}

