$(function () {
    function sendRegisterData(url) {
        $.ajax({
            method: 'POST',
            url: url,
            data: {
                name: document.getElementById('newsletter-email').value
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
