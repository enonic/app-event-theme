window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    // actions
    function toggleActive(event) {
        // day buttons
        for (let i = 0; i < document.getElementsByClassName('day-buttons').length; i++) { // for all day buttons
            let element = document.getElementsByClassName('day-buttons')[i];
            element.classList.remove("active");
        }
        this.classList.add("active");

        // talks
        for (let i = 0; i < document.getElementsByClassName('schedule-details').length; i++) { // for all day buttons
            let element = document.getElementsByClassName('schedule-details')[i];

            if (element.getAttribute('day') === this.getAttribute('day')) {
                element.classList.remove("hidden");
                element.classList.add("visible");
            } else {                
                element.classList.remove("visible");
                element.classList.add("hidden");
            }            
        }
        event.preventDefault();
    };
    
    // listeners
    try { // adding listeners to every day-button
        for (let i = 0; i < document.getElementsByClassName('day-buttons').length; i++) { // for all day buttons
            let element = document.getElementsByClassName('day-buttons')[i];
            element.addEventListener('click', toggleActive);       
            element.addEventListener('keyup', function(event) {        
                if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
                    element.click();
                }
            }); 
        }
    } catch (err) {}
});
