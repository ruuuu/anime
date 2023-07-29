const modal = () => {
         
      const modal = document.querySelector('.search-model');
      const modalBtn = document.querySelector('.icon_search');  //  кнпока лупы
      const closeBtn = modal.querySelector('.search-close-switch '); 

      //console.dir(modalBtn) 

      modalBtn.addEventListener('click', () => {  // Метод addEventListener() есть у каждого элемента станицы, а не только у кнопок
            modal.style.display = 'block';
      });


      closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
      });

};

modal();