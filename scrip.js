// Flip card functionality
const flipCard = document.getElementById('flipCard');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

showSignup.addEventListener('click', function (e) {
    e.preventDefault();
    flipCard.classList.add('flipped');
});

showLogin.addEventListener('click', function (e) {
    e.preventDefault();
    flipCard.classList.remove('flipped');
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    console.log('Login attempt:', { username, password, remember });
    alert('¡Bienvenido al sistema de gestión de eventos!');
});

// Signup form handler
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords match
    if (signupPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    console.log('Signup attempt:', { fullname, email, password: signupPassword });
    alert('¡Cuenta creada exitosamente! Bienvenido ' + fullname);

    // Flip back to login after successful signup
    setTimeout(() => {
        flipCard.classList.remove('flipped');
    }, 1500);
});

// Enhanced input focus effects
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});