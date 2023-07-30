const clider = () => {
      const swiper = new Swiper('.swiper', {
            //  Optional parameters
            direction: 'horizontal',
            loop: true,
            effect: "fade", // взять из https://swiperjs.com/demos#effect-fade https://codesandbox.io/p/sandbox/vl4fc8?file=%2Findex.html%3A74%2C7-74%2C22
          
            // // If we need pagination
            pagination: {  // точки внизу
              el: '.swiper-pagination',
            },
          
            // // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            speed: 1000
          
            // // And if we need scrollbar
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          });
};

clider();