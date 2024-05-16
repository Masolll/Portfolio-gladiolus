document.addEventListener('DOMContentLoaded', function() {
    const emailPreview = document.getElementById('emailPreview');
    const userEmail = localStorage.getItem('userEmail');
  
    // Отображаем email адрес пользователя
    emailPreview.innerText = userEmail || '******';
  });
  