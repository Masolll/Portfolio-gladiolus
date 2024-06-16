const saveButton = document.querySelector('.save');
const cancleButton = document.querySelector('.cancel');
saveButton.onclick = async function (){
    await fetch('/portfolio/fixedCertificates', {
        method: 'PUT'
    })
    await fetch('/portfolio/notFixedCertificates', {
        method: 'DELETE'
    })
    window.location.href = '/portfolio/success'
}
cancleButton.onclick= async function (){
    await fetch('/portfolio/notFixedCertificates', {
        method: 'DELETE'
    })
    window.location.href='/portfolio/success'
}