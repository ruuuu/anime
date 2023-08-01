const detailData = () => {

      const preloader = document.querySelector('.preloder');

      // отрисовка пунктов меню в шапке:
      const renderGanreList = (ganres) => {
            const headerMenu = document.querySelector('.header__menu  .dropdown');
            headerMenu.innerHTML = '';

            ganres.forEach((ganre) => {
                  headerMenu.insertAdjacentHTML('beforeend', `
                        <li><a href="./categories.html?ganre=${ganre}"> ${ganre} </a></li>
                  `);
            });       
      };


      // отрисовка карточки фильма:
      const renderAnimeDetail = (array, idFilm) => {               
            // ищет в массиве элемент(фильм) у котрого id = idFilm и вернет его:
            const filmObj = array.find((itemFilm) => itemFilm.id == idFilm);  // idFilm это строка из урла. itemFilm.id это число
            
            const imageBlock = document.querySelector('.anime__details__pic');
            const viewsBlock = imageBlock.querySelector('.view');
            const titleBlock = document.querySelector('.anime__details__title h3');
            const subTitleBlock = document.querySelector('.anime__details__title span');
            const descriptionBlock = document.querySelector('.anime__details__text p');
            const widgetList = document.querySelectorAll('.anime__details__widget ul li');
            const breadcrumb = document.querySelector('.breadcrumb__links span');


            if(filmObj){
                  imageBlock.dataset.setbg = filmObj.image;
                  viewsBlock.innerHTML = '';
                  viewsBlock.insertAdjacentHTML('beforeend', `
                        <i class="fa fa-eye"></i>${filmObj.views}
                  `);

                  titleBlock.textContent = filmObj.title; 
                  subTitleBlock.textContent = filmObj['original-title'];   // если ствойство составное, то обращаемся не через точку, а с квадрат скобками
                  descriptionBlock.textContent = filmObj.description;
                  
                  widgetList[0].insertAdjacentHTML('beforeend', `
                        <span>Date aired: </span>  ${filmObj.date}
                  `);

                  widgetList[1].insertAdjacentHTML('beforeend', `
                        <span> Status:  </span> ${filmObj.rating}
                  `);

                  widgetList[2].insertAdjacentHTML('beforeend', `
                        <span>Genre: </span> ${filmObj.tags.join(", ")}
                  `);

                  breadcrumb.textContent = filmObj.ganre;


                  document.querySelectorAll('.set-bg').forEach((elem) => { 
                        const src = elem.dataset.setbg;                             // получим значение дата атрибута setbg
                        elem.style.backgroundImage = `url(${src})`;
                  });

                  // отклбчаем прелоадер
                  setTimeout(()=> {  // переданная фукнция отработает через 500 мс
                        preloader.classList.remove('active');
                  },  500);
            }
            else{
                  console.log('фильм с запрашиваемым id отсутствует');
            }

      };




      fetch('https://anime-d6a5d-default-rtdb.firebaseio.com/db.json')                       // отправка запроса,  GET по умолчанию. Неизвестно через какое время придет ответ с сервера
            .then((response) => {           
                  return response.json();                   //  этот метод(асинхронный те рабоатет какое-то время) сработает не сразу(зависит от объема данных) превращает данные с сервера в понятный нам вид
            })  
            .then((data) => {                               // data = [{},{},{}] - массив фильмов              
                  console.log(data)
                  const ganres = new Set();                 // создали коллекцию пустую(объект),в цикле ее будем запонять,  она хранит уникальные значения 
                  
                  const genreParams = new URLSearchParams(window.location.search).get('itemId');  // в get() передали название query параметра
                  // console.log('genreParams ', genreParams)


                  data.forEach((item) => {
                        ganres.add(item.ganre);                   // add() метод коллекции Set(), добавляет элемент в коллекцию
                  });

                  // ganres = { 'История', 'Приключения', 'Фэнтези' }

                  if(genreParams){
                        renderAnimeDetail(data,  genreParams ); // отрисовка карточки фильма                          
                  }
                  else{
                        console.log('пока нет списка'); 
                  }
                  
                  
                  renderGanreList(ganres);            // для вывода категорий в меню
            });
};



detailData();