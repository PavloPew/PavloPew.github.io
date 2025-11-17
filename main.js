(function() {
    const numStars        = 150;
    const minSize         = 5;   // px
    const maxSize         = 7;   // px

    const minTwinkle      = 0.8;  // seconds
    const maxTwinkle      = 3.5;  // seconds

    const moveFraction    = 0.2;  // only 20% move
    const moveDurationMin = 30;   // seconds
    const moveDurationMax = 60;   // seconds
    const maxDrift        = 50;   // px — stars only drift up to ±50px

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomPxX() {
        return random(0, window.innerWidth);
    }
    function getRandomPxY() {
        return random(0, window.innerHeight);
    }

    function easeLog(t) {
        const k = 9;
        return Math.log(1 + k * t) / Math.log(1 + k);
    }

    function animateMove(elem, startX, startY, durationMs, callback) {
        const startTime = performance.now();
        const endX = startX + random(-maxDrift, maxDrift);
        const endY = startY + random(-maxDrift, maxDrift);

        function frame(now) {
            const elapsed = now - startTime;
            let t = elapsed / durationMs;
            if (t > 1) t = 1;

            const eased = easeLog(t);
            const curX = startX + (endX - startX) * eased;
            const curY = startY + (endY - startY) * eased;

            elem.style.left = curX + 'px';
            elem.style.top  = curY + 'px';

            if (t < 1) {
                requestAnimationFrame(frame);
            } else {
                if (callback) callback();
            }
        }

        requestAnimationFrame(frame);
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