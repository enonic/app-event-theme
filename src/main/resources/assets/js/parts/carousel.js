window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    console.log('carousel');

    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        console.log("plusSlides");
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        console.log("currentSlide");
        showSlides(slideIndex = n);
    }

    function tests(event, test) {
        console.log("teststse " + test);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("carousel-dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    // listeners
    try {
        let element = document.getElementsByClassName('prev')[0];
        element.addEventListener('click', plusSlides(-1));
    } catch (err) { }

    try {
        let element = document.getElementsByClassName('carousel-prev')[0];
        console.log(element);
        element.addEventListener('click', function () { tests(event, 'hrello'); });
    } catch (err) { }

    try {
        let element = document.getElementsByClassName('next')[0];
        element.addEventListener('click', plusSlides(1));
    } catch (err) { }

    try {
        for (let i = 0; i < document.getElementsByClassName('carousel-dot').length; i++) { // for all gallery control buttons
            let element = document.getElementsByClassName('carousel-dot')[i];
            element.addEventListener('click', toggleGallery);
        }
    } catch (err) { }
});