const bgElements = () => {

      const elements = document.querySelectorAll('.set-bg'); //  [ div, div ] - объект(масив и псевдомассив-объекты)

      elements.forEach((elem, index, array) => { // метод ничего не возвращает
            const src = elem.dataset.setbg;  // получим значение дата атрибута setbg
            elem.style.backgroundImage = `url(${src})`;
      });


      
};


bgElements();