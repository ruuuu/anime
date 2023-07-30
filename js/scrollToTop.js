const scrollToTop = () => {

      // плавынй скролл вверх страницы:
      const topBtn = document.querySelector('#scrollToTopButton');

      topBtn.addEventListener('click', (evt) => {
            evt.preventDefault();   // отменяет поведение по умолчанию (скрллит вверх)

            // window.scrollTo({              // window глоб объект нашей  страницы
            //       top: 0,
            //       behavior: 'smooth'
            // });  
            
            // такой подход не везде работае, поэтому
            // используем библиотеку  для плавного скроллинга: https://www.npmjs.com/package/seamless-scroll-polyfill

            seamless.scrollIntoView(document.querySelector(".header"), {            // скролим к эдементу с классом .header
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
            });
      });


};

