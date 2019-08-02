window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded    
    // actions
    function getAndSendCaegory(event) {
        let category = this.getAttribute('value');
        let home = this.getAttribute('home');
        window.location.href = home + '/news-article-results' + '?category=' + category
    };
    
    // listeners
    try { // adding listeners to every tag-list-item
        for (let i = 0; i < document.getElementsByClassName('category-list-item').length; i++) {
            let element = document.getElementsByClassName('category-list-item')[i];
            element.addEventListener('click', getAndSendCaegory);        
        }        
    } catch(err) {}
});
