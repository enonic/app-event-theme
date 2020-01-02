window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    // actions
    function toggleShowMore(event) {
        let questionElement = this;
        let answerElement = document.getElementById('faq-' + questionElement.getAttribute('data-index'));

        if (questionElement.getAttribute('data-toggle') === 'false') {
            if (answerElement.classList.contains('answer-box-hidden')) {
                answerElement.classList.remove('answer-box-hidden');
                answerElement.classList.add('answer-box-show');
                questionElement.setAttribute('data-toggle', 'true');
            }
        } else if (questionElement.getAttribute('data-toggle') === 'true') {
            if (answerElement.classList.contains('answer-box-show')) {
                answerElement.classList.add('answer-box-hidden');
                answerElement.classList.remove('answer-box-show');
                questionElement.setAttribute('data-toggle', 'false');
            }
        }
        event.preventDefault();
    };

    // listeners
    try {
        for (let i = 0; i < document.getElementsByClassName('faq-toggle-view-more').length; i++) { // for all question boxes
            let element = document.getElementsByClassName('faq-toggle-view-more')[i];
            element.addEventListener('click', toggleShowMore);
            element.addEventListener('keyup', function(event) {
                if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
                    element.click();
                }
            }); 
        }
    } catch (err) { }
});
