function init() {
    const style = ["style1", "style2", "style3", "style4", "style5"];
    const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generationStars() {
        const totalStars = 250;
        const starsContainer = document.querySelector(".constellation");
        const widthWindow = window.innerWidth;
        const heightWindow = window.innerHeight;

        let star = "";

        function getRandomFromArray(array) {
            return array[getRandomArbitrary(0, array.length)];
        }

        for (let i = 0; i < totalStars; i++) {
            const starStyle = getRandomFromArray(style);
            const starOpacity = getRandomFromArray(opacity);
            const starSize = getRandomFromArray(tam);
            const animationDelay = `.${getRandomArbitrary(0, 9)}s`;
            const leftPosition = `${getRandomArbitrary(0, widthWindow)}px`;
            const topPosition = `${getRandomArbitrary(0, heightWindow)}px`;

            star += `
            <span class="star ${starStyle} ${starOpacity} ${starSize}" 
                style="animation-delay: ${animationDelay}; left: ${leftPosition}; top: ${topPosition};">
            </span>`;
        }

        starsContainer.innerHTML = star;
    }

    let meteorDelay = 5000;

    function spawnMeteor() {
        setTimeout(spawnMeteor, meteorDelay);
        meteorDelay = getRandomArbitrary(5000, 10000);
        const meteor = `<div class="meteoro ${style[getRandomArbitrary(0, 4)]}"></div>`;
        const meteorContainer = document.getElementsByClassName('meteorites')[0];
        meteorContainer.innerHTML = meteor;

        setTimeout(function() {
            meteorContainer.innerHTML = "";
        }, 1000);
    }
    setTimeout(spawnMeteor, meteorDelay);
    generationStars();
    spawnMeteor();


}

window.onload = init;
