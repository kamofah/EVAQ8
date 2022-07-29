document.addEventListener('DOMContentLoaded', () => {
    //Cancel Page Code 
    const cancelPage = document.getElementsByClassName('cancel-page')[0];
    cancelPage.addEventListener('click', () => {
        window.close();
    });

    //Timer Related Code
    const timerToggle = document.getElementsByClassName('timer-toggle')[0];
    let isTimerActive = false; 
    timerToggle.addEventListener('click', () => {

        //Switch Toggle From Start & Stop
        if (isTimerActive) {
            timerToggle.innerText = "Start";
            timerToggle.style.color = "green";
            isTimerActive = !isTimerActive;
        } else {
            timerToggle.innerText = "Stop";
            timerToggle.style.color = "red";
            isTimerActive = !isTimerActive;
        }

        // Run Timer Code
    });

    // Add Website Code
        //Save the websites added into an array


    // Remove Website Code




    // Live Search Code
        //Use filter method

});
