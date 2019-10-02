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
            elementMenu.setAttribute('data-toggle', 'false');
        }
    }

    function toggleSubmenu(event) {
        let element = this;
        let id = element.getAttribute('subChoice');
        let elementMenu = document.getElementById('submenu-' + id);
        let angleUpIcon = document.getElementById('submenu-fa-angle-up-' + id);
        let angleDownIcon = document.getElementById('submenu-fa-angle-down-' + id);

        if (elementMenu.getAttribute('data-toggle') === 'false') {
            elementMenu.style.display = 'block';
            elementMenu.style.opacity = '1';
            elementMenu.style.visibility = 'visible';
            elementMenu.style.transform = 'none';
            elementMenu.setAttribute('data-toggle', 'true');
            elementMenu.style['border-top'] = '2px solid #ff6600';
            angleUpIcon.style.display = 'inline-block';
            angleDownIcon.style.display = 'none';
        } else if (elementMenu.getAttribute('data-toggle') === 'true') {
            elementMenu.style.display = 'none';
            elementMenu.setAttribute('data-toggle', 'false');
            angleUpIcon.style.display = 'none';
            angleDownIcon.style.display = 'inline-block';
        }

        for (let i = 0; i < document.getElementsByClassName('nav-item').length; i++) {
            try {
                if (i.toString() === id) {
                    continue;
                }
                let elementMenu = document.getElementById('submenu-' + i.toString());
                elementMenu.style.display = 'none';
                elementMenu.setAttribute('data-toggle', 'false');

                let elementangleUpIcon = document.getElementById('submenu-fa-angle-up-' + i);
                let elementAngleDownIcon = document.getElementById('submenu-fa-angle-down-' + i);
                elementangleUpIcon.style.display = 'none';
                elementAngleDownIcon.style.display = 'inline-block';
            } catch (error) { }
        }
        event.preventDefault();
    }

    // listeners
    try {
        document.getElementById('subscribe-button').addEventListener('click', function (e) {
            let url = e.target.getAttribute('url');
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
            element.addEventListener('click', toggleSubmenu);
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
