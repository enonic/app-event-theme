window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded    
    // actions
    function getAndSendTag(event) {
        let tag = this.getAttribute('value');
        let home = this.getAttribute('home');
        window.location.href = home + '/news-article-results' + '?search=' + tag
    };
    
    // listeners
    try { // adding listeners to every tag-list-item
        for (let i = 0; i < document.getElementsByClassName('tag-list-item').length; i++) {
            let element = document.getElementsByClassName('tag-list-item')[i];
            element.addEventListener('click', getAndSendTag);        
        }        
    } catch(err) {}
});
