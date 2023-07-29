const preloader = () => {

      const preloader = document.querySelector('.preloder');


      preloader.classList.add('active');

      setTimeout(()=> {  // переданная фукнция отработает через 500 мс
            preloader.classList.remove('active');
      },  500);

      // инкпсулировнаие кода- это замкнуть его внутри  функии, котрую будем вызывать
};

preloader();