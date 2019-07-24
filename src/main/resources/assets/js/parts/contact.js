$(function () {
    function sendRegisterData(url) {
        console.log("contact button tests");
        $.ajax({
            method: 'POST',
            url: url,
            data: {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                ticket: document.getElementById('contactMessage').value
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
            var url = e.target.dataset.url;
            sendRegisterData(url);
        });
    }
    catch (err) {
        console.log('contact.js: Error adding listener to contact-button');
    }
});
