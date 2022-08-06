document.addEventListener('DOMContentLoaded', () => {
    /**
     * The following code closes the extension window
     */
    const CANCEL_PAGE = document.getElementsByClassName('cancel-page')[0];
    CANCEL_PAGE.addEventListener('click', () => {
        window.close();
    });

    /**
     * The following code switchs between the website and breaks tab
     */
    const WEBSITE_TAB = document.getElementsByClassName('website-tab')[0];
    const BREAK_TAB = document.getElementsByClassName('break-tab')[0];
    BREAK_TAB.addEventListener('click', () => {
        if(!BREAK_TAB.className.includes('active-tab')){
            BREAK_TAB.className += " active-tab";
            WEBSITE_TAB.className = "option-item";
        }
    });

    WEBSITE_TAB.addEventListener('click', () => {
        if(!WEBSITE_TAB.className.includes('active-tab')){
            WEBSITE_TAB.className += " active-tab";
            BREAK_TAB.className = "option-item";
        }
    });

    /**
     * The following code triggers the timers start and stop button.
     * Additionally adjusts the timer accordingly.
     */
    const HOURS = document.getElementsByClassName('hours')[0];
    const MINUTES = document.getElementsByClassName('minutes')[0];
    const SECONDS = document.getElementsByClassName('seconds')[0];
    const TIMER_TOGGLE = document.getElementsByClassName('timer-toggle')[0];
    let isTimerActive = false;

    function formatTimerSection(timerSection){
        if(timerSection.value == "0"){
            timerSection.value = "00";
        }
        if(parseInt(timerSection.value) < 10){
            timerSection.value = "0" + parseInt(timerSection.value);
        }
    }

    function calculateTimer(hourVal, minVal, secVal){
        if(parseInt(hourVal) == 0 && parseInt(minVal) == 0 && parseInt(secVal) == 0){
            HOURS.value = "00";
            MINUTES.value = "00";
            SECONDS.value = "00";
            stopInterval();
            TIMER_TOGGLE.click();
        } else if(parseInt(secVal) != 0){
            SECONDS.value = parseInt(secVal) - 1;
            SECONDS.value = SECONDS.value.toString();
            formatTimerSection(SECONDS);
        } else if(parseInt(minVal) != 0 && parseInt(secVal) == 0){
            SECONDS.value = "59";
            MINUTES.value = parseInt(minVal) - 1;
            MINUTES.value = MINUTES.value.toString();
            formatTimerSection(MINUTES);

        } else if(parseInt(hourVal) != 0 && parseInt(minVal) == 0){
            MINUTES.value = "60";
            HOURS.value = parseInt(hourVal) - 1;
            HOURS.value.toString();
            formatTimerSection(HOURS);
        }
        return
    }
    
    function stopInterval() {
        clearInterval(startTimer);
    }

    TIMER_TOGGLE.addEventListener('click', () => {
        if (isTimerActive) {
            TIMER_TOGGLE.innerText = "Start";
            TIMER_TOGGLE.style.color = "green";
            isTimerActive = !isTimerActive;
            HOURS.style.border = '';
            MINUTES.style.border = '';
            SECONDS.style.border = '';
            stopInterval();
            HOURS.removeAttribute('disabled');
            MINUTES.removeAttribute('disabled');
            SECONDS.removeAttribute('disabled');
        } else {
            TIMER_TOGGLE.innerText = "Stop";
            TIMER_TOGGLE.style.color = "red";
            isTimerActive = !isTimerActive;
            HOURS.style.border = 'none';
            MINUTES.style.border = 'none';
            SECONDS.style.border = 'none'; 
            HOURS.setAttribute('disabled', '')
            MINUTES.setAttribute('disabled', '')
            SECONDS.setAttribute('disabled', '')
            function startInterval(){
                startTimer = setInterval(function() {
                    console.log("here")
                    calculateTimer(HOURS.value, MINUTES.value, SECONDS.value);
                    
                }, 1000);
            }
            startInterval();
        }
    });

    /**
     * Following code excutes code for when the Add Website button is clicked.
     * Additionally handles updating frontend when a user enters a website by
     * Saving the websites typed by the user into an array when the user presses enter.
     */
    const WEBSITE_CARDS_SECTION = document.getElementById('website-cards-section');
    function generateWebsiteCard(websiteUrl){
        let htmlCard = `
            <div class="website-content">
                <p class="website-text">${websiteUrl}</p>
                <div class="website-controls">
                    <svg class="website-edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                    <svg class="website-cancel" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
        `;
        return htmlCard;
    }

    // Render a card for each website entered by the user
    function renderWebsiteCards(renederList){
        let websiteIndex = 0;
        renederList.forEach((website) => {
            // TODO? Separate the code for rendering the card into a function, that way you can use it when handling the live search feature
            let websiteCard = document.createElement('div');
            websiteCard.setAttribute('class', 'website-card');
            websiteCard.setAttribute('id', `website-card-${websiteIndex}`);
            // TODO: In the websiteCard inner html, find a way to display the given websites favicon before the website text
            websiteCard.innerHTML += generateWebsiteCard(website);
            WEBSITE_CARDS_SECTION.appendChild(websiteCard);
            websiteIndex++;
        });
    }

    let listOfWebsites = [];
    // listOfWebsites = ["Youtube.com", "Google.com", "Netflix.com", "Grammarly.com", "reddit.com", "amazon.com"];
    let addWebsite = document.getElementsByClassName('add-website')[0];
    let addWebsiteText = document.getElementsByClassName('add-website-text')[0];
    let websiteInput;
    addWebsite.addEventListener('click', () => {
        if(addWebsite.lastElementChild.tagName === 'P'){
            websiteInput = document.createElement('input');
            websiteInput.className = 'website-search';
            websiteInput.type = 'text';
            websiteInput.setAttribute('autofocus', "");
            addWebsite.replaceChild(websiteInput, addWebsite.lastElementChild);
        }
        websiteInput.addEventListener('keypress', (event) => {
            if(event.key === 'Enter'){
                listOfWebsites.push(websiteInput.value);
                console.log(listOfWebsites)
                console.log(addWebsite.lastElementChild)
                addWebsite.replaceChild(addWebsiteText, addWebsite.lastElementChild);
                WEBSITE_CARDS_SECTION.innerHTML = '';
                renderWebsiteCards(listOfWebsites);
            }
        });
    });
    renderWebsiteCards(listOfWebsites);

    /**
     * Remove a website card when the website cancel button is clicked
     * TODO: Find a way to access newly created DOM Elements
     */
    const LIST_OF_CARDS = [].slice.call(document.getElementById('website-cards-section').children);
    LIST_OF_CARDS.forEach((card) => {
        const CARD_CANCEL = document.getElementsByClassName('website-cancel')[0];
        CARD_CANCEL.addEventListener('click', () => {
            let cardIndex = CARD_CANCEL.id.charAt(CARD_CANCEL.id.length - 1);
            listOfWebsites.splice(cardIndex, 1);
            console.log(listOfWebsites);
        });
    });

    /**
     * Handles Live Filtered Search when the user types into the search bar for a website
     */
    const WEBSITE_SEARCH = document.getElementsByClassName('website-search')[0];
    WEBSITE_SEARCH.addEventListener('keyup', (event) => {
        let filteredWebsites = listOfWebsites.filter((website) => website.toLowerCase().substring(0, website.length - 4).includes(WEBSITE_SEARCH.value.toLowerCase()));
        WEBSITE_CARDS_SECTION.innerHTML = '';
        renderWebsiteCards(filteredWebsites);
    });

    chrome.storage.sync.set({"listOfWebsites": listOfWebsites})

});



