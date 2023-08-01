// поле поиска отобраажется рпи нажатии на лупу

const modal = () => {
         
      const modal = document.querySelector('.search-model');
      const modalBtn = document.querySelector('.icon_search');  //  кнпока лупы
      const closeBtn = modal.querySelector('.search-close-switch '); 
      const searchInput = modal.querySelector('#search-input');  // поле поиска
      const wrapper = modal.querySelector('.search-model-result');

      wrapper.style.width = '100%';
      wrapper.style.maxWidth = '500px';   // max-width: 500px
     

      const debounce = (func, ms=300) => {  // принимает функию и ms=300  по дефолту. Эта функwия будет вызываться через 300ms
           return func;
      };

      const searchDebounce = debounce((searchString) => {  // передаем  то, что ввели в поле поиска. Функция searchFunc(searchString) вызовется через 500ms
            searchFunc(searchString); 
      }, 500);



      // отрисовка списка ссылок с фильмами под полем поиска:
      const renderFunc = (filteredFilms) => {
            wrapper.innerHTML = '';         // очищаем перед заполнением 
          
            filteredFilms.forEach((itemFilm) => {
                  wrapper.insertAdjacentHTML('afterbegin', `
                        <a class="p-2" href="/anime-details.html?itemId=${itemFilm.id}" target="_blank"> ${itemFilm.title} </a>
                  `);
            });  
      };



      const searchFunc = (searchStr) => {

            fetch('https://anime-d6a5d-default-rtdb.firebaseio.com/db.json')
            .then((response) => {            
                  return response.json();           
            })  
            .then((data) => {                   // этот метод запутсится когда отработает предыдущий then(), data - [{}, {}, {}] - фильмы
                  const filteredData = data.filter(dataItem => {
                        if(dataItem.description.toLowerCase().includes(searchStr.toLowerCase()) || dataItem.title.toLowerCase().includes(searchStr.toLowerCase())) {
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
            wrapper.innerHTML = '';         // очищаем 
      });



      searchInput.addEventListener('input', (evt) => {       // при каждом вводе символа в поле, сработает событие 
            //searchFunc(evt.target.value);           // evt.target это input, evt.target.value - значение введенное в поле
            searchDebounce(evt.target.value);         // отложеннный вызов
      });

};



modal();