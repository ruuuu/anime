const mainData  = () => {

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
                 
                  // сортируем и возвращаем первые 5 элементов массива:
                  // data.sort((a, b) => b.views - a.views).slice(0, 5)
                  renderToAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));  // сортировка по убыванию, (a.views - b.views сортирует по возрастанию)
            })
}

mainData();

// Метод slice(0, 5) выреззает из исходного массива часть массива. Передаем в метод 1-ый параметр: индекс элемент начиная с котрого будем резать. 2-ый параметр: индекс элемента по котрой закзанчивем резать. САм этот элемент не включается