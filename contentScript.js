const webpageContent = document.querySelector('body');
webpageContent.innerHTML = `
    <div class="lock-page"> 
        <p>${window.location.hostname.substring(4, window.location.hostname.length)} is locked via EVA-Q8<p>
        <img src="./EVAQ8_Icon-transparent.png">
    <div>
`;

