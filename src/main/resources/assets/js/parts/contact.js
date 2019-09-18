$(function () {
    function sendRegisterData(url) {
        $.ajax({
            method: 'POST',
            url: '/_/service/app.event.theme/contact',
            data: {
                name: document.getElementById('contactName').value,
                fromEmail: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                message: document.getElementById('contactMessage').value,
                toEmail: url,
            }
        }).done(function () {
            button = document.getElementById('contact-button');
            button.innerText = 'message sent';
            button.disabled = true;
        });
    }

    // listeners
    try {
        document.getElementById('contact-button').addEventListener('click', function (e) {
            var url = e.target.getAttribute('data-url');
            sendRegisterData(url);
        });
    }
    catch (err) {}
});
