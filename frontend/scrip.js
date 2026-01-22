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

// API Base URL
const API_URL = 'http://localhost:5000/api';

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(`¡Bienvenido ${data.user.name}!`);

            // Store user data
            if (remember) {
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }

            // Redirect based on user type
            // window.location.href = data.user.userType === 'client' ? 'dashboard-cliente.html' : 'dashboard-publicador.html';
        } else {
            alert(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor. Asegúrate de que el backend esté ejecutándose.');
    }
});

// Signup form handler
document.getElementById('signupForm').addEventListener('submit', async function (e) {
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

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, password: signupPassword })
        });

        const data = await response.json();

        if (data.success) {
            // Store user data temporarily for the next step
            sessionStorage.setItem('tempUserData', JSON.stringify(data.userData));

            // Redirect to account type selection
            window.location.href = 'etapados.html';
        } else {
            alert(data.message || 'Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor. Asegúrate de que el backend esté ejecutándose.');
    }
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