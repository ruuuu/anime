const mainData  = () => {

      const renderAnimeList = (array, ganres) => {                // коллекwия Set() ganres { 'Фэнтези', 'Приключения', 'История' }
            const wrapper = document.querySelector('.product .col-lg-8');
            wrapper.innerHTML = '';

            ganres.forEach((ganre) => {  // перебираем коллекцию ganres { 'Фэнтези', 'Приключения', 'История' }
                  const productBlock = document.createElement('div');
                  const listBlock = document.createElement('div');
                  listBlock.classList.add('row');
                  
                  const list = array.filter((item) => {           // получим [ {}, {}, {} ] - фильмы определенного жанра ganre
                        return (item.ganre === ganre);
                  });

                  productBlock.classList.add('mb-5'); 


                  productBlock.insertAdjacentHTML('afterbegin', `
                        <div class="row">
                              <div class="col-lg-8 col-md-8 col-sm-8">
                              <div class="section-title">
                                    <h4>${ganre}</h4>
                              </div>
                              </div>
                              <div class="col-lg-4 col-md-4 col-sm-4">
                              <div class="btn__all">
                                    <a href="/categories.html" class="primary-btn">View All <span class="arrow_right"></span></a>
                              </div>
                              </div>
                        </div>
                  `);



                  list.forEach((itemFilm) => {  // перебирираем фильмы(6 шт) определеннго жанра

                        const listTags = document.createElement('ul');
                        itemFilm.tags.forEach((tag) => {
                              listTags.insertAdjacentHTML('afterbegin', `
                                    <li>${tag}</li>
                              `);
                        })


                        listBlock.insertAdjacentHTML('afterbegin', `
                              <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                          <div class="product__item__pic set-bg" data-setbg="${itemFilm.image}">
                                                <div class="ep"> ${itemFilm.rating} / 10</div>
                                                <div class="view"><i class="fa fa-eye"></i> ${itemFilm.views} </div>
                                          </div>
                                          <div class="product__item__text">
                                                ${listTags.outerHTML} <!-- outerHTML(включает родителя)/innerHTML(не включает родителя) хранит верстку ввиде строки-->
                                                <h5><a href="/anime-details.html">${itemFilm.title} </a></h5>
                                          </div>
                                    </div>
                              </div>
                        `);
                  });


                  productBlock.append(listBlock);
                  wrapper.append(productBlock);

                  wrapper.querySelectorAll('.set-bg').forEach((elem) => { 
                        const src = elem.dataset.setbg;  // получим значение дата атрибута setbg
                        elem.style.backgroundImage = `url(${src})`;
                  });
            });
      }



      const renderToAnime = (array) => {
            console.log('array ', array);
            
            const wrapper = document.querySelector('.filter__gallery');
            wrapper.innerHTML = '';  // очищаем контенейр перед его заполнением


            array.forEach((item) => {  // метод forEach ничего не возвращает
                  wrapper.insertAdjacentHTML('afterbegin', `
                        <div class="product__sidebar__view__item set-bg mix day years" data-setbg="${item.image}">
                              <div class="ep">18 / ${item.rating}</div>
                              <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                              <h5><a href="/anime-details.html">${item.title}</a></h5>
                        </div>
                  `
                  )
            });

            

            wrapper.querySelectorAll('.set-bg').forEach((elem) => { 
                  const src = elem.dataset.setbg;  // получим значение дата атрибута setbg
                  elem.style.backgroundImage = `url(${src})`;
            });

      }


      

      fetch('https://anime-d6a5d-default-rtdb.firebaseio.com/db.json')                       // отправка запроса,  GET по умолчанию. Неизвестно через какое время придет ответ с сервера
            .then((response) => {             // этот метод запустится когда получим данные с сервера, response-{}
                  return response.json();            //  этот метод(асинхронный те рабоатет какое-то время) сработает не сразу(зависит от объема данных) превращает данные с сервера в понятный нам вид
            })  
            .then((data) => {                   // этот метод запутсится когда отработает предыдущий then(), data - обработанные данные
                  const ganres = new Set();      // коллекция, чтобы отправить в массив униклаьные значения


                  // сортируем и возвращаем первые 5 элементов массива:
                  // data.sort((a, b) => b.views - a.views).slice(0, 5)
                  renderToAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));  // сортировка по убыванию, (a.views - b.views сортирует по возрастанию)
                  
                  data.forEach((item) => {
                        ganres.add(item.ganre);  // add() метод коллекции, доабвляет элемент в коллекцию
                  });

                  renderAnimeList(data, ganres);
            
            })
}



mainData();










// Метод slice(0, 5) выреззает из исходного массива часть массива. Передаем в метод 1-ый параметр: индекс элемент начиная с котрого будем резать. 2-ый параметр: индекс элемента по котрой закзанчивем резать. САм этот элемент не включается