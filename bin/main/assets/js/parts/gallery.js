window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    // actions
    function toggleGallery(event) {        
        for (let i = 0; i < document.getElementsByClassName('control').length; i++) {
            let controlElement = document.getElementsByClassName('control')[i];
            if (controlElement.classList.contains('mixitup-control-active')) { // gallery name highlighting
                controlElement.classList.remove('mixitup-control-active');
            }
            for (let j = 0; j < document.getElementsByClassName('gallery-item').length; j++) { // show/hide gallery images
                let imageElement = document.getElementsByClassName('gallery-item')[j];
                    if (imageElement.getAttribute('filter') === this.getAttribute('filter')) {
                        imageElement.style.display = "flex";
                    } else {
                        imageElement.style.display = "none";
                    }
            }
        }

        this.classList.add('mixitup-control-active');        
        event.preventDefault();
    };

    // listeners
    try {
        for (let i = 0; i < document.getElementsByClassName('control').length; i++) { // for all gallery control buttons
            let element = document.getElementsByClassName('control')[i];
            element.addEventListener('click', toggleGallery);        
        }
    } catch(err) {}
});
