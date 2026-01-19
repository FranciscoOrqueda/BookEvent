document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Aquí irían las validaciones y el envío al servidor
            console.log('Login attempt:', { username, password, remember });

            // Simulación de login exitoso
            alert('¡Bienvenido al sistema de gestión de salones!');
        });

        // Efecto de focus en inputs
        const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });