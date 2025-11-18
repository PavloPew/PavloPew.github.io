(function() {
    const numStars        = 150;
    const minSize         = 5;   // px
    const maxSize         = 8;   // px

    const minTwinkle      = 5;  // seconds
    const maxTwinkle      = 7;  // seconds


    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomPxX() {
        return random(0, window.innerWidth-10);
    }
    function getRandomPxY() {
        return random(0, window.innerHeight-10);
    }

    function easeLog(t) {
        const k = 9;
        return Math.log(1 + k * t) / Math.log(1 + k);
    }

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = random(minSize, maxSize);
        star.style.width  = size + 'px';
        star.style.height = size + 'px';

        const initialX = getRandomPxX();
        const initialY = getRandomPxY();
        star.style.left = initialX + 'px';
        star.style.top  = initialY + 'px';

        const twinkleDuration = random(minTwinkle, maxTwinkle);
        const twinkleDelay    = random(0, maxTwinkle);

        star.style.animationName           = 'twinkle';
        star.style.animationDuration       = twinkleDuration + 's';
        star.style.animationDelay          = twinkleDelay + 's';
        star.style.animationIterationCount = 'infinite';
        star.style.animationTimingFunction = 'ease-in-out';

        document.body.appendChild(star);
    }
})();