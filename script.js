// script.js

// script.js

// Function to open the Auth Modal
function openAuthModal(type = 'signin') {
    const modal = document.getElementById('authModal');
    modal.classList.add('open');

    // Optionally switch to sign up if clicking "Get Access"
    if (type === 'buy') {
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('signup-form').classList.add('active');
    } else {
        document.getElementById('signup-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
    }
}

// Function to close the Auth Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('open');
}

// Function to toggle between Login and Sign Up forms inside the modal
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Smooth fade transition
    if (loginForm.classList.contains('active')) {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    }
}

// Function to simulate Social Login (Apple/Google)
function simulatedSocialLogin(provider, btnElement) {
    if (btnElement.classList.contains('loading')) return;

    // Save original content
    const originalHTML = btnElement.innerHTML;

    // Set loading state
    btnElement.classList.add('loading');
    btnElement.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting...`;
    btnElement.style.pointerEvents = 'none';

    // Simulate network request (1.5s delay)
    setTimeout(() => {
        // Show success state
        btnElement.innerHTML = `<i class="fa-solid fa-check" style="color: #1DB954;"></i> Connected`;

        // Close modal and reset after short delay
        setTimeout(() => {
            closeAuthModal();
            loginSession();

            // Reset button to original state for future uses
            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
                btnElement.classList.remove('loading');
                btnElement.style.pointerEvents = 'auto';
            }, 500);

            // Give a welcome alert via Toast
            showToast('Success', `Successfully authenticated with ${provider}! Welcome to KweangKwang.`);
        }, 800);

    }, 1500);
}

// User Session & Dropdown Management
let isLoggedIn = false;

function loginSession() {
    isLoggedIn = true;
    document.getElementById('navLoginBtn').style.display = 'none';
    document.getElementById('navUserProfile').style.display = 'flex';

    // Set mock balance 
    document.querySelector('.balance-val').innerText = (Math.random() * 500 + 100).toFixed(2);
}

function logoutSession() {
    isLoggedIn = false;
    document.getElementById('userDropdown').classList.remove('show');
    document.getElementById('navUserProfile').style.display = 'none';
    document.getElementById('navLoginBtn').style.display = 'flex';
}

function toggleUserDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    // Check if clicked outside dropdown and not on hamburger button
    if (dropdown && hamburgerBtn && dropdown.classList.contains('show') &&
        !dropdown.contains(e.target) &&
        e.target !== hamburgerBtn &&
        !hamburgerBtn.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// Top-Up Modal Functions
function openTopupModal() {
    const modal = document.getElementById('topupModal');
    modal.classList.add('open');
    document.getElementById('userDropdown').classList.remove('show'); // Ensure dropdown closes
}

function closeTopupModal() {
    const modal = document.getElementById('topupModal');
    modal.classList.remove('open');
}

// Purchase History Modal Functions
function openHistoryModal() {
    const modal = document.getElementById('historyModal');
    modal.classList.add('open');
    document.getElementById('userDropdown').classList.remove('show');
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    modal.classList.remove('open');
}

// Order Data Modal Functions ("ดูข้อมูล" Button)
function openOrderDataModal() {
    // Optionally close history modal first for cleaner UX, or stack them:
    closeHistoryModal();

    const modal = document.getElementById('orderDataModal');
    modal.classList.add('open');
}

function closeOrderDataModal() {
    const modal = document.getElementById('orderDataModal');
    modal.classList.remove('open');
}


// Payment Tab Switching (Using Button style)
function switchPayment(methodId, btnElement) {
    // Hidden old section
    document.querySelectorAll('.pay-section').forEach(sec => sec.classList.remove('active'));
    // Un-highlight old button
    document.querySelectorAll('.pay-option-btn').forEach(btn => btn.classList.remove('active'));

    // Show new section
    document.getElementById('pay-' + methodId).classList.add('active');
    // Highlight new button style
    btnElement.classList.add('active');
}

// Mock Processing for Payment Gates
function simulatePaymentProcessing(btnElement) {
    if (btnElement.classList.contains('loading')) return;

    const originalHTML = btnElement.innerHTML;
    btnElement.classList.add('loading');
    btnElement.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;
    btnElement.style.pointerEvents = 'none';

    setTimeout(() => {
        btnElement.innerHTML = `<i class="fa-solid fa-check" style="color: #1DB954;"></i> Payment Successful`;

        setTimeout(() => {
            closeTopupModal();

            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
                btnElement.classList.remove('loading');
                btnElement.style.pointerEvents = 'auto';
            }, 500);

            // Update Mock Balance
            let balanceNode = document.querySelector('.balance-val');
            let currentBalance = parseFloat(balanceNode.innerText);
            let addedAmount = (Math.random() * 1000 + 500); // Random top up amount
            balanceNode.innerText = (currentBalance + addedAmount).toFixed(2);

            showToast('Payment Successful', `Added ${addedAmount.toFixed(2)} ฿ to your balance.`);
        }, 1200);

    }, 2000); // Process for 2 seconds
}

// --- CUSTOM TOAST NOTIFICATIONS ---
function showToast(title, message, iconClass = 'fa-solid fa-circle-check') {
    const container = document.getElementById('toast-container');

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';

    // Inner HTML structure
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    // Append to container
    container.appendChild(toast);

    // Trigger animation frame for CSS transition
    requestAnimationFrame(() => {
        setTimeout(() => toast.classList.add('show'), 10);
    });

    // Remove after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Wait for transition out
    }, 3500);
}

// Minimalistic Canvas Dark Particle System
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];

    // adjust density of particles based on screen size
    let numberOfParticles = (canvas.width * canvas.height) / 12000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5; // size between 0.5 and 2.5
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let directionX = (Math.random() * 0.4) - 0.2; // slow drift
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = 'rgba(255, 215, 0, 0.12)'; // faint glowing gold

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;

        // Add minimal glow to particles
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';

        ctx.fill();

        // Reset shadow to avoid affecting everything
        ctx.shadowBlur = 0;
    }

    update() {
        // Bounce off walls
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    // Clear canvas entirely on each frame
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Re-initialize particles on window resize
window.addEventListener('resize', () => {
    initParticles();
});

// Run particle system
initParticles();
animateParticles();

// Additional interaction enhancements
document.querySelectorAll('.input-group input').forEach(input => {
    // Make focus line extra bright on focus
    input.addEventListener('focus', () => {
        const line = input.parentElement.querySelector('.focus-line');
        if (line) line.style.boxShadow = '0 0 15px var(--gold)';
    });

    input.addEventListener('blur', () => {
        const line = input.parentElement.querySelector('.focus-line');
        if (line) line.style.boxShadow = '0 0 10px var(--gold)';
    });
});
