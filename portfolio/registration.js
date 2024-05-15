document.getElementById('registerButton').addEventListener('click', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    localStorage.setItem('userName', username);
  
    const form = document.getElementById('registrationForm');
    const formElements = form.elements;
    let isValid = true;
  
    // Проверка заполненности всех полей
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
  
      if (element.required && !element.value) {
        isValid = false;
        element.classList.add('error');
      } else {
        element.classList.remove('error');
      }
    }
  
    // Проверка длины пароля (минимум 8 символов)
    const password = document.getElementById('password');
    if (password.value.length < 8) {
      isValid = false;
      password.classList.add('error');
    } else {
      password.classList.remove('error');
    }
  
    // Проверка совпадения паролей
    const repeatPassword = document.getElementById('repeatPassword');
    if (repeatPassword.value !== password.value) {
      isValid = false;
      repeatPassword.classList.add('error');
    } else {
      repeatPassword.classList.remove('error');
    }
  
    if (isValid) {
      const email = document.getElementById('email').value;
  
      // Сохраняем email адрес в localStorage
      localStorage.setItem('userEmail', email);
  
      // Переходим на следующую страницу
      window.location.href = 'registration/confirmEmail';
    } else {
      // Показываем сообщение об ошибке, если есть незаполненные поля, пароль слишком короткий или пароли не совпадают
      alert('Пожалуйста, проверьте все поля и убедитесь, что пароль содержит минимум 8 символов и пароли совпадают.');
    }
    
  });
  