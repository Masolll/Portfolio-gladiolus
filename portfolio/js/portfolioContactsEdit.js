const saveButton = document.querySelector('.save-item');



saveButton.onclick = function (evt){
    evt.preventDefault();
    let phone = document.querySelector('.userPhone').value;
    let city = document.querySelector('.userAddress').value;
    let email = document.querySelector('.userEmail').value;
    let vkLink = document.querySelector('.vkLink').value;
    let tiktokLink = document.querySelector('.tiktokLink').value;
    let githubLink = document.querySelector('.githubLink').value;
    let telegramLink = document.querySelector('.telegramLink').value;
    fetch(
        "/portfolio",
        {
            method: 'PUT',
            body: JSON.stringify({
                'contacts.phone': phone,
                'contacts.address.city': city,
                'contacts.email': email,
                'contacts.socialList': {
                    'vk': vkLink,
                    'tiktok': tiktokLink,
                    'github': githubLink,
                    'telegram': telegramLink
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

