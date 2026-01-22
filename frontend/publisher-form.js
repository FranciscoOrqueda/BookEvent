// API Base URL
const API_URL = 'http://localhost:5000/api';

// Publisher form handler
document.getElementById('publisherForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const responsibleName = document.getElementById('responsibleName').value;
    const contactPhone = document.getElementById('contactPhone').value;
    const city = document.getElementById('city').value;

    // Get temporary user data from previous step
    const tempUserData = JSON.parse(sessionStorage.getItem('tempUserData'));

    if (!tempUserData) {
        alert('Error: No se encontraron datos de registro. Por favor, vuelve a registrarte.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/complete-publisher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                responsibleName,
                email: tempUserData.email,
                password: tempUserData.password,
                phone: contactPhone,
                city
            })
        });

        const data = await response.json();

        if (data.success) {
            // Clear temporary data
            sessionStorage.removeItem('tempUserData');

            // Store user session
            sessionStorage.setItem('user', JSON.stringify(data.user));

            alert(`¡Bienvenido ${responsibleName}! Tu cuenta ha sido creada exitosamente.`);

            // Redirect to dashboard
            // window.location.href = 'dashboard-publicador.html';
        } else {
            alert(data.message || 'Error al completar el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor. Asegúrate de que el backend esté ejecutándose.');
    }
});

// Enhanced input focus effects
const inputs = document.querySelectorAll('input[type="text"], input[type="tel"]');
inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});
