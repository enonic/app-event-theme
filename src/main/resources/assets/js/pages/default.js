$(function () {
    function sendRegisterData(url) {
        $.ajax({
            method: 'POST',
            url: '/_/service/app.event.theme/subscribe', // TODO: bruk portalLib.serviceUrl
            data: {
                fromEmail: document.getElementById('newsletter-email').value,
                toEmail: url,
            }
        }).done(function () {
            button = document.getElementById('subscribe-button');
            button.innerText = 'Subscribed';
            button.disabled = true;
        });
    }

    // listeners
    try {
        document.getElementById('subscribe-button').addEventListener('click', function (e) {
            var url = e.target.dataset.url;
            sendRegisterData(url);
        });
    }
    catch (err) {
        console.log('default.js: Error adding listener to subscribe-button');
    }
});

window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    /* HEADER SCROLLING 
        https://www.w3schools.com/howto/howto_js_sticky_header.asp) 
    */
    // When the user scrolls the page, execute myFunction 
    window.onscroll = function() {scrollFunction()};

    // Get the header
    var header = document.getElementById("myHeader");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function scrollFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    /* TO-TOP BUTTON 
        https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
        https://stackoverflow.com/questions/15935318/smooth-scroll-to-top/48837437
    */
    function sendUserToTop(event) {
        // document.body.scrollTop = document.documentElement.scrollTop = 0; // For Safari, Chrome, Firefox, IE and Opera
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                let scrollSpeed = 16; // for slower motion of the scrolling, increase this number.
                window.scrollTo(0, c - c / scrollSpeed);
            }
        };
        scrollToTop();
    }

    try {
        var toTopButton = document.getElementById('toTop');
        toTopButton.addEventListener('click', sendUserToTop);
    } catch(err) {}
});
