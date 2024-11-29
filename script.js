(function() {
    function timeline() {
        var selectors = {
            id: document.querySelector(".timeline"),
            items: document.querySelectorAll(".timeline-item"),
            activeClass: "timeline-item--active",
            img: ".timeline-img"
        };

        var itemLength = selectors.items.length;

        window.addEventListener("scroll", function() {
            var pos = window.scrollY;

            selectors.items.forEach(function(item, i) {
                var min = item.offsetTop;
                var max = item.offsetHeight + item.offsetTop;

                if (i === itemLength - 2 && pos > min + item.offsetHeight / 2) {
                    setActiveItem(selectors.items[itemLength - 1]);
                } else if (pos <= max - 40 && pos >= min) {
                    setActiveItem(item);
                }
            });
        });

        function setActiveItem(item) {
            resetActiveItems();
            item.classList.add(selectors.activeClass);
            // Update the body ::before pseudo-element background image
            document.body.style.setProperty('--background-image', "url(" + item.querySelector(selectors.img).getAttribute("src") + ")");
        }

        function resetActiveItems() {
            selectors.items.forEach(function(el) {
                el.classList.remove(selectors.activeClass);
            });
        }
    }

    window.timeline = timeline;
    timeline();
})();

const menu = document.querySelector("header");
window.addEventListener("scroll", ()=>{
    if(window.scrollY >= 1){
        menu.classList.add('sticky');
        }
    else{
        menu.classList.remove('sticky');
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-menu");
    const navs = document.querySelector(".header-navs");
        
    hamburger.addEventListener("click", () => {
        navs.classList.toggle("active");
    });    
});
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/*Slider JS */
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}
