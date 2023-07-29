const bgElements = () => {

      const elements = document.querySelectorAll('.set-bg'); //  []

      for(let i = 0; i < elements.length; i++ ){
            //console.dir(elements[i]);           // выведет элемент ввиде объекта
            const src = elements[i].dataset.setbg;  // получим значение дата атрибута setbg
            elements[i].style.backgroundImage = `url(${src})`;
            //console.dir(elements[i])
      }
};