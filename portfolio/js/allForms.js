document.getElementById("filter-button").addEventListener("click", function () {
    var filterBlock = document.querySelector(".users-filter");
    filterBlock.classList.toggle("filter-none");
});
const confirmButton = document.querySelector('.Confirm');
confirmButton.onclick = function (){
    const minAge = document.querySelector('.ramka-old-start').value;
    const maxAge = document.querySelector('.ramka-old-end').value;
    const city = document.querySelector('.city-input').value;
    const isProjects = document.querySelector('.custom-checkbox1').checked === true;
    const skill = document.querySelector('.list-skills').value;
    const isCertificates = document.querySelector('.custom-checkbox3').checked === true;
    const checkboxM = document.querySelector('.custom-checkbox');
    const checkboxW = document.querySelector('.custom-checkbox2');
    let gender;//чтобы получить всех пользователей независимо от гендера нужно передать любой гендер кроме m, w, none
    if (checkboxW.checked === checkboxM.checked){
        if (checkboxW.checked === false){
            gender = "none";
        }
    }else if(checkboxW.checked === true){
        gender='w';
    }else if(checkboxM.checked === true){
        gender='m';
    }
    let queryParams = `minAge=${minAge}&maxAge=${maxAge}&city=${city}&projects=${isProjects}&certificates=${isCertificates}&gender=${gender}&skills=${skill}`
    window.location.href='/allForms?'+queryParams

}


