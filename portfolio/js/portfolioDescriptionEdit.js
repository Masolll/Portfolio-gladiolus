const saveButton = document.querySelector('.save-item');
saveButton.onclick = function (evt){
    evt.preventDefault();
    let inputText = document.querySelector('.description-input').value;
    fetch(
        "/portfolio",
        {
            method: 'PUT',
            body: JSON.stringify({'description.text': inputText}),
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => {
        if (response.ok){
            window.location.href='/portfolio/description'
        }else{
            throw new Error();
        }
    }).catch(error => console.log('произошла ошибка'))

}

