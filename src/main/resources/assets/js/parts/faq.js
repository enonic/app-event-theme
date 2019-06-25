window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    function toggleShowMore(event) {
        let questionElement = this;
        let answerElement = document.getElementById('faq-'+questionElement.dataset.index);

        if (questionElement.dataset.toggle === 'false') {
            if (answerElement.classList.contains('answer-box-hidden')) {
                answerElement.classList.replace('answer-box-hidden', 'answer-box-show');
                questionElement.dataset.toggle = 'true';
            }
        } else if (questionElement.dataset.toggle === 'true') {
            if (answerElement.classList.contains('answer-box-show')) {
                answerElement.classList.replace('answer-box-show', 'answer-box-hidden');
                questionElement.dataset.toggle = 'false';
            }
        }
        
        event.preventDefault();
    };
    
    for (let i = 0; i < document.getElementsByClassName('faq-toggle-view-more').length; i++) { // for all question boxes
        let element = document.getElementsByClassName('faq-toggle-view-more')[i];
        element.addEventListener('click', toggleShowMore);        
    }
});
