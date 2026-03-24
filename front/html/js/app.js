const API_BASE = 'https://manueltdseback.duckdns.org/api';

function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tab === 'login') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('login-tab').classList.add('active');
    } else {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('register-tab').classList.add('active');
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.className = 'message';
        messageDiv.textContent = '';
    }, 3000);
}

function redirectToDashboard() {
    window.location.href = '/dashboard.html';
}

function redirectToLogin() {
    window.location.href = '/';
}

async function checkSession() {
    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            credentials: 'include'
        });

        if (response.ok) {
            const user = await response.json();
            return user;
        }
        return null;
    } catch (error) {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Login successful! Redirecting...', 'success');
                    setTimeout(() => redirectToDashboard(), 1000);
                } else {
                    showMessage(data.message || 'Login failed', 'error');
                }
            } catch (error) {
                showMessage('Network error. Please try again.', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                const response = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Registration successful! Please login.', 'success');
                    showTab('login');
                    document.getElementById('register-form').reset();
                } else {
                    showMessage(data.message || 'Registration failed', 'error');
                }
            } catch (error) {
                showMessage('Network error. Please try again.', 'error');
            }
        });
    }

    if (window.location.pathname.includes('dashboard.html')) {
        checkSession().then(user => {
            if (!user) {
                redirectToLogin();
            } else {
                document.getElementById('user-name').textContent = user.name;
                document.getElementById('user-email').textContent = user.email;
            }
        });
    }
});

async function testApi() {
    const responseDiv = document.getElementById('api-response');
    responseDiv.textContent = 'Loading...';

    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            credentials: 'include'
        });

        const data = await response.json();
        responseDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseDiv.textContent = 'Error: ' + error.message;
    }
}

async function logout() {
    try {
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        redirectToLogin();
    } catch (error) {
        redirectToLogin();
    }
}