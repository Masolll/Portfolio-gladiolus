document.getElementById('editButton').addEventListener('click', function(e) {
    e.preventDefault(); // Отменить переход по ссылке
  
    // Показать кнопки "Сохранить изменения" и "Отменить сохранения"
    document.querySelector('.save-button').style.display = 'inline-block';
    document.querySelector('.cancel-button').style.display = 'inline-block';
  
    // Скрыть кнопку "Редактировать"
    document.getElementById('editButton').style.display = 'none';
  });


  document.querySelector('.cancel-button').addEventListener('click', function(e) {
    e.preventDefault(); // Отменить переход по ссылке
  
    // Скрыть кнопки "Сохранить изменения" и "Отменить сохранения"
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.cancel-button').style.display = 'none';
  
    // Показать кнопку "Редактировать"
    document.getElementById('editButton').style.display = 'inline-block';
  });
  

  document.querySelector('.save-button').addEventListener('contactInfo', function(e) {
    e.preventDefault(); // Отменить переход по ссылке
  
    // Здесь реализуйте логику сохранения изменений
  
    // Скрыть кнопки "Сохранить изменения" и "Отменить сохранения"
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.cancel-button').style.display = 'none';
  
    // Показать кнопку "Редактировать"
    document.getElementById('editButton').style.display = 'inline-block';
  });
  