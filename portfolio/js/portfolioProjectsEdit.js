const saveButton = document.querySelector('.save-item');
saveButton.onclick = function (evt){
    evt.preventDefault();
    let project1 = document.querySelector('.project1').value;
    let project2 = document.querySelector('.project2').value;
    let project3 = document.querySelector('.project3').value;
    let project4 = document.querySelector('.project4').value;
    fetch(
        "/portfolio",
        {
            method: 'PUT',
            body: JSON.stringify({
                'projects.project1': project1,
                'projects.project2': project2,
                'projects.project3': project3,
                'projects.project4': project4
            }),
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => {
        if (response.ok){
            window.location.href='/portfolio/projects'
        }else{
            throw new Error();
        }
    }).catch(error => console.log('произошла ошибка'))

}

