$(function () {
    function sendRegisterData(url) {
        $.ajax({
            method: 'POST',
            url: '/_/service/app.event.theme/subscribe',
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
    // When the user scrolls the page, execute myFunction 
    window.onscroll = function() {myFunction()};

    // Get the header
    var header = document.getElementById("myHeader");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});
