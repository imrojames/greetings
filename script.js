const heart = document.querySelector('.heart');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const popSound = document.getElementById('popSound');

const messages = [
    "Happy Valentine's Day! annging I hope this put's you a smile in your face 😊. I know this is simple but this comes from the heart. I LOVE YOU❤️😘"
];

const valentineImages = [
    'img/pic1.jpg',
    'img/pic2.jpg',
    'img/pic3.jpg'
];

let currentIndex = 0;

function createHeartParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'heart-particle';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const size = 10 + Math.random() * 20;
    let posX = x;
    let posY = y;
    let alpha = 1;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    function updateParticle() {
        posX += Math.cos(angle) * velocity;
        posY += Math.sin(angle) * velocity - 2; // Add gravity effect
        alpha -= 0.02;

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = alpha;

        if (alpha > 0) {
            requestAnimationFrame(updateParticle);
        } else {
            particle.remove();
        }
    }

    requestAnimationFrame(updateParticle);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ff69b4', '#ff1493', '#ff69b4']
    });
}

function createFloatingImage(x, y) {
    const image = document.createElement('img');
    image.className = 'floating-image';
    image.src = valentineImages[Math.floor(Math.random() * valentineImages.length)];
    document.getElementById('floating-images').appendChild(image);

    // Random starting position around the heart
    const angle = Math.random() * Math.PI * 2;
    const distance = 100;
    const startX = x + Math.cos(angle) * distance;
    const startY = y + Math.sin(angle) * distance;

    // Random movement values
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;
    const rotationSpeed = (Math.random() - 0.5) * 4;
    let rotation = 0;

    // Set initial position
    image.style.left = `${startX}px`;
    image.style.top = `${startY}px`;

    // Make image visible after a small delay
    setTimeout(() => {
        image.classList.add('visible');
    }, 100);

    function updateImage() {
        const currentX = parseFloat(image.style.left);
        const currentY = parseFloat(image.style.top);
        
        image.style.left = `${currentX + speedX}px`;
        image.style.top = `${currentY + speedY}px`;
        
        rotation += rotationSpeed;
        image.style.transform = `rotate(${rotation}deg)`;

        // Remove image if it goes off screen
        const rect = image.getBoundingClientRect();
        if (rect.top < -200 || rect.left < -200 || 
            rect.top > window.innerHeight + 200 || 
            rect.left > window.innerWidth + 200) {
            image.remove();
            return;
        }

        requestAnimationFrame(updateImage);
    }

    requestAnimationFrame(updateImage);
}

heart.addEventListener('click', (e) => {
    // Play sound
    popSound.currentTime = 0;
    popSound.play();

    // Create heart particles
    const rect = heart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Add floating images
    for (let i = 0; i < 3; i++) {
        createFloatingImage(centerX, centerY);
    }

    // Existing particle and confetti effects...
    for (let i = 0; i < 10; i++) {
        createHeartParticle(centerX, centerY);
    }
    triggerConfetti();

    // Scale animation for heart
    heart.style.transform = 'rotate(45deg) scale(1.3)';
    setTimeout(() => {
        heart.style.transform = 'rotate(45deg) scale(1)';
    }, 200);

    // Update message with animation
    message.style.transform = 'scale(0)';
    setTimeout(() => {
        message.textContent = messages[currentIndex];
        message.style.transform = 'scale(1)';
        currentIndex = (currentIndex + 1) % messages.length;
    }, 200);
});

resetBtn.addEventListener('click', () => {
    message.style.transform = 'scale(0)';
    setTimeout(() => {
        message.textContent = "Click the heart to see a special message ❤️";
        message.style.transform = 'scale(1)';
        currentIndex = 0;
    }, 200);

    // Remove all floating images
    const floatingImages = document.getElementById('floating-images');
    while (floatingImages.firstChild) {
        floatingImages.firstChild.remove();
    }
});

// Add transition effect to message
message.style.transition = 'transform 0.3s ease-in-out';
heart.style.transition = 'transform 0.2s ease-in-out'; 