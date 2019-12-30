$(function () {
    function sendRegisterData(url) {
        console.log('scubbi-dubb!');
        $.ajax({
            method: 'POST',
            url: '/_/service/com.enonic.app.event.theme/register', // TODO: url should be dynamic
            data: {
                name: document.getElementById('registerName').value,
                fromEmail: document.getElementById('registerEmail').value,
                phone: document.getElementById('registerPhone').value,
                ticket: document.getElementById('select-ticket').value,
                toEmail: url,
            }
        }).done(function () {
            button = document.getElementById('register-button');
            button.innerText = 'Registered';
            button.disabled = true;
        });
    }

    // listeners
    try {
        document.getElementById('register-button').addEventListener('click', function (e) {
            var url = e.target.dataset.url;
            var url = e.target.getAttribute('data-url');
            sendRegisterData(url);
        });
    }
    catch (err) { }
});
