const saveButton = document.querySelector('.save');
saveButton.onclick = function (evt){
    evt.preventDefault();
    let inputText = document.querySelector('.description-input').value;
    let selectSkills = document.querySelectorAll('.selected');
    let skills = []
    for (let skill of selectSkills){
        skills.push(skill.textContent)
    }
    fetch(
        "/portfolio",
        {
            method: 'PUT',
            body: JSON.stringify({
                'description.text': inputText,
                'description.skills': skills
            }),
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

