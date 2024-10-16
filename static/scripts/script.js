function init() {
    const style = ["style1", "style2", "style3", "style4", "style5"];
    const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
    const stylesMeteorsLeft = ["styleLeft1", "styleLeft2", "styleLeft3"];

    const audio = new Audio("static/images/Scala_Kolacny_Brothers_-_Smells_Like_Teen_Spirit_68331663 (mp3cut.net).mp3");

    audio.addEventListener('ended', function() {
        resetAnimation();
    });

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
    let meteorTimeout;
    let allowMeteors = true;

    function spawnMeteor() {
        if (!allowMeteors) return;

        meteorTimeout = setTimeout(spawnMeteor, meteorDelay);
        meteorDelay = getRandomArbitrary(1000, 15000);

        const isLeftToRight = Math.random() < 0.5;

        let meteor;
        if (isLeftToRight) {
            meteor = `<div class="meteoro-left ${stylesMeteorsLeft[getRandomArbitrary(0, stylesMeteorsLeft.length)]}"></div>`;
            console.log("Meteor from left created");
        } else {
            meteor = `<div class="meteoro ${style[getRandomArbitrary(0, style.length)]}"></div>`;
            console.log("Meteor from right created");
        }

        const meteorContainer = document.getElementsByClassName('meteorites')[0];
        meteorContainer.innerHTML = meteor;

        setTimeout(function() {
            meteorContainer.innerHTML = "";
        }, 1000);
    }

    let pressedKeys = [];
    let fallingStars = [];
    let isFalling = false;

    document.addEventListener("keydown", function(event) {
        pressedKeys.push(event.key);

        if (pressedKeys.join('').endsWith('111')) {
            makeStarsFall();
            allowMeteors = false;
            resetMeteors();

            audio.play();
        }

        if (pressedKeys.join('').endsWith('222')) {
            resetAnimation();
        }

        if (pressedKeys.length > 3) {
            pressedKeys.shift();
        }
    });

    function makeStarsFall() {
        if (isFalling) return;

        isFalling = true;
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            fallingStars.push({
                element: star,
                initialTop: star.getBoundingClientRect().top,
                initialLeft: star.getBoundingClientRect().left,
                top: star.getBoundingClientRect().top,
                left: star.getBoundingClientRect().left,
                speed: Math.random() * 0.55 + 0.45
            });
        });

        requestAnimationFrame(updateStars);
    }

    // Обновляем позиции падающих звёзд
    function updateStars() {
        fallingStars.forEach(star => {
            if (star.top < window.innerHeight) {
                star.top += star.speed; // Звезда падает вниз
                star.element.style.top = star.top + 'px';
            }
        });

        if (fallingStars.some(star => star.top < window.innerHeight)) {
            requestAnimationFrame(updateStars);
        } else {
            isFalling = false;
        }
    }

    // Возвращаем звезды на исходные позиции
    function resetStars() {
        fallingStars.forEach(star => {
            star.element.style.top = star.initialTop + 'px';
            star.element.style.left = star.initialLeft + 'px';
        });

        fallingStars = [];
        isFalling = false;
        resetMeteors();
    }

    // Остановка и сброс метеоров
    function resetMeteors() {
        clearTimeout(meteorTimeout);
        const meteorContainer = document.getElementsByClassName('meteorites')[0];
        meteorContainer.innerHTML = "";
    }

    // Функция для сброса анимации и звука
    function resetAnimation() {
        resetStars();
        allowMeteors = true;
        setTimeout(spawnMeteor, meteorDelay);
        audio.pause();
        audio.currentTime = 0;
    }

    setTimeout(spawnMeteor, meteorDelay);
    generationStars();
    spawnMeteor();
}

window.onload = init;
