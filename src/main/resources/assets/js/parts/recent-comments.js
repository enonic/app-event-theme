$(function () {
    function goToTopComment() {
        window.location.hash = '#topComment';
        window.location.reload(true);
    }

    function sendRegisterData() {
        $.ajax({
            method: 'POST',
            url: '/_/service/app.event.theme/recent-comments',
            data: {
                _path: document.getElementById('leave-a-comment').getAttribute('parent-path'),
                _id: document.getElementById('leave-a-comment').getAttribute('parent-id'),
                name: document.getElementById('comment-name').value,
                content: document.getElementById('comment-content').value,
            }
        }).done(function () {
            button = document.getElementById('comment-button');
            button.innerText = 'Thought submitted!';
            button.disabled = true;
            goToTopComment();
        }).error(function (err) {
            console.log("Error creating creating comment: " + err);
        });
    }

    // listeners
    try {
        document.getElementById('comment-button').addEventListener('click', function (e) {
            sendRegisterData();
        });
    }
    catch (err) { }
});
