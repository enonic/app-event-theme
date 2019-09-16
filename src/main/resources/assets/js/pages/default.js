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

    function toggleNavbar() {
        element = document.getElementById('navbarNav');
        if (element.classList.contains('show')) {
            element.classList.remove("show");
        } else {
            element.classList.add("show");
        }

        for (let i = 0; i < document.getElementsByClassName('nav-link-hasChildren').length; i++) {
            let element = document.getElementsByClassName('nav-link-hasChildren')[i];
            let elementMenu = document.getElementById('submenu-' + element.getAttribute('subChoice'));
            elementMenu.style.display = 'none';
            elementMenu.dataset.toggle = 'false';
        }
    }

    function toggleNavLinkHasChildren(event) {
        let element = this;
        let elementMenu = document.getElementById('submenu-' + element.getAttribute('subChoice'));

        if (elementMenu.dataset.toggle === 'false') {
            elementMenu.style.display = 'block';
            elementMenu.style.opacity = '1';
            elementMenu.style.visibility = 'visible';
            elementMenu.style.transform = 'none';
            elementMenu.dataset.toggle = 'true';
            elementMenu.style['border-top'] = '3px solid #ff6600';
        } else if (elementMenu.dataset.toggle === 'true') {
            elementMenu.style.display = 'none';
            elementMenu.dataset.toggle = 'false';
        }

        for (let i = 0; i < document.getElementsByClassName('nav-item').length; i++) {
            try {
                if (i.toString() === element.getAttribute('subChoice')) {
                    continue;
                }
                let elementMenu = document.getElementById('submenu-' + i.toString());
                elementMenu.style.display = 'none';
                elementMenu.dataset.toggle = 'false';
            } catch (error) {}
        }
        event.preventDefault();
    }

    // listeners
    try {
        document.getElementById('subscribe-button').addEventListener('click', function (e) {
            let url = e.target.dataset.url;
            sendRegisterData(url);
        });
    }
    catch (err) { }

    try {
        document.getElementsByClassName('navbar-toggler')[0].addEventListener('click', function (e) {
            toggleNavbar();
        });
    }
    catch (err) { }

    try {
        for (let i = 0; i < document.getElementsByClassName('nav-link-hasChildren').length; i++) {
            let element = document.getElementsByClassName('nav-link-hasChildren')[i];
            element.addEventListener('click', toggleNavLinkHasChildren);
        }
    }
    catch (err) { }
});

window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    /* HEADER SCROLLING 
        https://www.w3schools.com/howto/howto_js_sticky_header.asp) 
    */
    // When the user scrolls the page, execute myFunction 
    window.onscroll = function () { scrollFunction() };

    // Get the header
    let header = document.getElementById("myHeader");

    // Get the offset position of the navbar
    let sticky = header.offsetTop;

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
        document.getElementById('toTop').addEventListener('click', sendUserToTop);
    } catch (err) { }
});
