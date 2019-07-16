$(function () {
    function sendRegisterData(url) {
        $.ajax({
            method: 'POST',
            url: url,
            data: {
                name: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                phone: document.getElementById('registerPhone').value,
                ticket: document.getElementById('select-ticket').value
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
            sendRegisterData(url);
        });
    }
    catch (err) {
        console.log('register-to.js: Error adding listener to register-button');
    }
});
