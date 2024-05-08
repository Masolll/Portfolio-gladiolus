let buttonGetAllForms = document.querySelector('#allForms');

buttonGetAllForms.addEventListener('click', async ()=>{
    await fetch(
        "http://localhost:3000/users",
        {
            method: 'GET'
        }
    ).then(p => p.json()).then(p => console.log(p));
})