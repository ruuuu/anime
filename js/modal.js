// поле поиска отобраажется рпи нажатии на лупу

const modal = () => {
         
      const modal = document.querySelector('.search-model');
      const modalBtn = document.querySelector('.icon_search');  //  кнпока лупы
      const closeBtn = modal.querySelector('.search-close-switch '); 
      const searchInput = modal.querySelector('#search-input');  // поле поиска
      const searchModalResult = modal.querySelector('.search-model-result');
      
      searchModalResult.innerHTML = '';  

      // отрисовка списка ссылок с фильмами под полем поиска:
      const renderFunc = (filteredFilms) => {
                  // перед заполнением очищаем

            filteredFilms.forEach(elemFilm => {
                 const a = document.createElement('a');
                 a.classList.add('p-2');
            //      a.href = elemFilm.href;
                 a.textContent = elemFilm.title;
                 searchModalResult.append(a);
            });

            modal.append(searchModalResult);            
      };


      const searchFunc = (searchStr) => {

            fetch('https://anime-d6a5d-default-rtdb.firebaseio.com/db.json')
            .then((response) => {            
                  return response.json();           
            })  
            .then((data) => {                   // этот метод запутсится когда отработает предыдущий then(), data - [{}, {}, {}] - фильмы
                  const filteredData = data.filter(dataItem => {
                        if(dataItem.description.includes(searchStr) || dataItem.title.includes(searchStr)) {
                              return dataItem;
                        }    
                  });

                 console.log('filteredData  ', filteredData.slice(0, 5)); 
                 const filteredFilms = filteredData.slice(0, 5);  // первые 5 элементов тлоько берем у массива filteredData
                 renderFunc(filteredFilms);  
            })
      };


    

      modalBtn.addEventListener('click', () => {  // Метод addEventListener() есть у каждого элемента станицы, а не только у кнопок
            //modal.style.display = 'block';
            modal.classList.add('active');
            searchInput.focus();
      });


      closeBtn.addEventListener('click', () => {
            //modal.style.display = 'none';
            modal.classList.remove('active');
            searchInput.value = '';             // очистка поля
      });


      searchInput.addEventListener('input', (evt) => {       // при каждом вводе символа в поле, сработает событие 
            searchFunc(evt.target.value);       // evt.target это input, evt.target.value - значение введенное в поле
           
      });

};



modal();