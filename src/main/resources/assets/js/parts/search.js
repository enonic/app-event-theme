window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    // actions
    function getAndSendQueryWord(event) {
        let input = document.getElementById('search-input');
        window.location.href = input.dataset.home + '/search-results' + '?search=' + input.value
    };
    
    // listeners
    try {
        var searchIcon = document.getElementById('search-icon');
        searchIcon.addEventListener('click', getAndSendQueryWord);
        var searchInput = document.getElementById('search-input');
        searchInput.addEventListener('keyup', function(event) {        
            if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
                event.preventDefault();
                document.getElementById('search-icon').click();
            }
        });
    } catch(err) {}
});
