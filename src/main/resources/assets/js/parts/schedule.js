window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    // actions
    function toggleActive(event) {
        // day buttons
        for (let i = 0; i < document.getElementsByClassName('day-buttons').length; i++) { // for all day buttons
            let element = document.getElementsByClassName('day-buttons')[i];
            element.classList.remove("active");
        }
        this.classList.add("active");
        console.log(this.getAttribute('day'));

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
        }
    } catch (err) {
        console.log('schedule.js: Error adding listener to day-button ' + err);
    }
});
