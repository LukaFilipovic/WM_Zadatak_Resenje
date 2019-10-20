$(document).ready(function () {
    // initialize slick-carousel when document ready
    $('.hero__wrapper').slick({
        // autoplay: true,
        autoplaySpeed: 4500,
        arrows: true,
        dots: false,
        appendArrows: $('.hero__text-box'),
        fade: true,
        mobileFirst: true,
        prevArrow: `
            <img src="./src/images/icon--arrow-left.png" data-toggle="prev" alt="Previous" title="Previous" class="slick-prev hero__arrow-icon hero__arrow-icon--left">
        `,
        nextArrow: `
            <img src="./src/images/icon--arrow-right.png" data-toggle="next" alt="Next" title="Next" class="slick-next hero__arrow-icon">
        `,
        responsive: [
            {
              breakpoint: 479,
              settings: {
                arrows: false,
                dots: true
              }
            }
        ]
      });
      $('.hero__arrow-icon[data-toggle="prev"]').click(function(){
        $('.hero__wrapper').slick('slickPrev')
      })
      $('.hero__arrow-icon[data-toggle="next"]').click(function(){
        $('.hero__wrapper').slick('slickNext')
      })
    // init smooth scroll
    let scroll = new SmoothScroll('a[data-scroll="smooth"]');

    // handle toggling of mobile navigation and search bar
    $('button[data-toggle="toggle"]').click(function(){
        let target= $(this).attr('data-target');
        $(this).toggleClass('-active');
        $(`${target}`).toggleClass('-active');
    })

    // init scrollmagic
    let controller = new ScrollMagic.Controller({
        container: 'body',
        vertical: true,
        refreshInterval: 100,
        loglevel: 1
    });
    // init scene
    let aboutScene = new ScrollMagic.Scene({
        duration: 0,
        offset: 100,
        triggerElement: '.about',
        triggerHook: 0.4,
        reverse: false,
        loglevel: 1
    })
    .addTo(controller);
    // create timeline
    let aboutTimeline =  new TimelineMax();
    aboutTimeline
        .staggerFromTo('.about .block-holder__block', 0.25, {x: 20, opacity: 0},{x: 0, opacity: 1},'0.15')
    aboutScene.setTween(aboutTimeline)

    // let footerScene = new ScrollMagic.Scene({
    //     duration: 0,
    //     offset: 50,
    //     triggerElement: '.footer',
    //     triggerHook: 1,
    //     reverse: false,
    //     loglevel: 1
    // })
    // .addTo(controller);
    // let footerTimeline =  new TimelineMax();
    // footerTimeline
    //     .fromTo('.footer', 0.25, {y: 30, opacity: 0},{y: 0, opacity: 1})
    // footerScene.setTween(footerTimeline)
    
    let workScene = new ScrollMagic.Scene({
        duration: 0,
        offset: 50,
        triggerElement: '.what-we-do',
        triggerHook: 0.6,
        reverse: false,
        loglevel: 1
    })
    .addTo(controller);
    let workTimeline =  new TimelineMax();
    workTimeline
    .staggerFromTo('.what-we-do .block-holder__block', 0.25, {y: 30, opacity: 0},{y: 0, opacity: 1},'0.15')
    workScene.setTween(workTimeline)
});
