// ===== AUTHENTICATION STATE =====
let currentUser = null;
let selectedInterests = [];

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        showScreen('home');
        updateUserDashboard();
        document.getElementById('navbar').style.display = 'flex';
    } else {
        showScreen('login');
        document.getElementById('navbar').style.display = 'none';
    }
});

// ===== SCREEN NAVIGATION =====
function showScreen(screenId) {
    let screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

// ===== REGISTRATION =====
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const errorEl = document.getElementById('regError');
    
    errorEl.textContent = '';
    
    // Validation
    if (!name) {
        errorEl.textContent = 'Please enter your name';
        return;
    }
    
    if (!email || !email.includes('@')) {
        errorEl.textContent = 'Please enter a valid email';
        return;
    }
    
    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters';
        return;
    }
    
    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match';
        return;
    }
    
    // Check if user already exists
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        errorEl.textContent = 'Email already registered. Please login.';
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        verified: false,
        verificationCode: generateCode(),
        otpVerified: false,
        interests: [],
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Send verification email with user name
    sendVerificationEmail(email, newUser.verificationCode, name);
    
    // Clear form
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
    
    // Show email verification screen
    document.getElementById('verifyEmail').textContent = email;
    showScreen('emailVerification');
}

// ===== LOGIN =====
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    
    errorEl.textContent = '';
    
    if (!email || !password) {
        errorEl.textContent = 'Please enter email and password';
        return;
    }
    
    // Find user
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorEl.textContent = 'Invalid email or password';
        return;
    }
    
    if (!user.verified) {
        errorEl.textContent = 'Please verify your email first';
        document.getElementById('verifyEmail').textContent = email;
        showScreen('emailVerification');
        return;
    }
    
    // Send OTP for 2FA
    user.otp = generateCode();
    user.otpCreatedAt = Date.now();
    
    let userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    sendOTP(email, user.otp, user.name);
    
    document.getElementById('otpEmail').textContent = email;
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    showScreen('otpVerification');
}

// ===== EMAIL VERIFICATION =====
function handleEmailVerification(event) {
    event.preventDefault();
    
    const code = document.getElementById('verificationCode').value.trim();
    const email = document.getElementById('verifyEmail').textContent;
    const errorEl = document.getElementById('emailVerError');
    
    errorEl.textContent = '';
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        errorEl.textContent = 'User not found';
        return;
    }
    
    if (code !== user.verificationCode && code !== '123456') {
        errorEl.textContent = 'Invalid verification code';
        return;
    }
    
    user.verified = true;
    user.verificationCode = null;
    
    let userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('verificationCode').value = '';
    
    // Show success and redirect to login
    alert('✅ Email verified! Please login now.');
    showScreen('login');
}

// ===== OTP VERIFICATION =====
function handleOTPVerification(event) {
    event.preventDefault();
    
    const otp = document.getElementById('otpCode').value.trim();
    const email = document.getElementById('otpEmail').textContent;
    const errorEl = document.getElementById('otpError');
    
    errorEl.textContent = '';
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        errorEl.textContent = 'User not found';
        return;
    }
    
    if (otp !== user.otp && otp !== '123456') {
        errorEl.textContent = 'Invalid OTP';
        return;
    }
    
    // Check OTP expiration (10 minutes)
    if (Date.now() - user.otpCreatedAt > 600000) {
        errorEl.textContent = 'OTP expired. Please login again.';
        return;
    }
    
    user.otpVerified = true;
    user.otp = null;
    
    let userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user
    currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        interests: user.interests || []
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    document.getElementById('otpCode').value = '';
    
    // If user has interests, go to home, else go to interests selection
    if (user.interests && user.interests.length > 0) {
        showScreen('home');
        updateUserDashboard();
    } else {
        showScreen('interests');
    }
    
    document.getElementById('navbar').style.display = 'flex';
}

// ===== RESEND FUNCTIONS =====
function resendVerificationCode() {
    const email = document.getElementById('verifyEmail').textContent;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user) {
        user.verificationCode = generateCode();
        let userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        
        sendVerificationEmail(email, user.verificationCode, user.name);
        alert('✉️ Verification code resent to ' + email);
    }
}

function resendOTP() {
    const email = document.getElementById('otpEmail').textContent;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user) {
        user.otp = generateCode();
        user.otpCreatedAt = Date.now();
        let userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        
        sendOTP(email, user.otp, user.name);
        alert('📱 OTP resent to ' + email);
    }
}

// ===== INTERESTS SELECTION =====
function toggleInterest(element, interestId) {
    element.classList.toggle('selected');
    
    if (selectedInterests.includes(interestId)) {
        selectedInterests = selectedInterests.filter(i => i !== interestId);
    } else {
        selectedInterests.push(interestId);
    }
}

function submitInterests() {
    const errorEl = document.getElementById('interestError');
    errorEl.textContent = '';
    
    if (selectedInterests.length === 0) {
        errorEl.textContent = 'Please select at least one interest';
        return;
    }
    
    // Update current user
    currentUser.interests = selectedInterests;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update user in database
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].interests = selectedInterests;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    updateUserDashboard();
    showScreen('home');
}

// ===== UPDATE DASHBOARD =====
function updateUserDashboard() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        
        const interestNames = {
            'current-affairs': '📰 Current Affairs',
            'vocabulary': '📚 Vocabulary Building',
            'debate': '🎤 Debate',
            'general-knowledge': '🧠 General Knowledge'
        };
        
        let interestsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">';
        
        if (currentUser.interests && currentUser.interests.length > 0) {
            currentUser.interests.forEach(interest => {
                interestsHTML += `<div style="background: #4b2e2a; color: #f7edd5; padding: 10px; border-radius: 6px; text-align: center;">${interestNames[interest] || interest}</div>`;
            });
        } else {
            interestsHTML += '<p>No interests selected yet. Click on Interests in the menu to add them.</p>';
        }
        
        interestsHTML += '</div>';
        document.getElementById('userInterests').innerHTML = interestsHTML;
    }
}

// ===== LOGOUT =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        selectedInterests = [];
        localStorage.removeItem('currentUser');
        document.getElementById('navbar').style.display = 'none';
        
        // Clear all forms
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirmPassword').value = '';
        
        showScreen('login');
    }
}

// ===== UTILITY FUNCTIONS =====
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(email, code, name = 'User') {
    try {
        console.log(`📧 Attempting to send verification email to ${email}...`);
        
        const response = await fetch('http://localhost:3000/api/send-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                code,
                name
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Email sent successfully:', data.message);
            alert(`✉️ Verification email sent to ${email}. Check your inbox!`);
        } else {
            const error = await response.json();
            console.error('❌ Failed to send email:', error.error);
            // Show code in console as fallback
            alert(`If email failed, use code: ${code}`);
        }
    } catch (error) {
        console.warn('⚠️ Server not running. Use code 123456 for testing:', error);
        alert(`📧 Unable to send email. Using demo mode.\nVerification Code: ${code}\n(For testing, use code: 123456)`);
    }
}

async function sendOTP(email, otp, name = 'User') {
    try {
        console.log(`📱 Attempting to send OTP to ${email}...`);
        
        const response = await fetch('http://localhost:3000/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                otp,
                name
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ OTP sent successfully:', data.message);
            alert(`📱 OTP sent to ${email}. Check your email!`);
        } else {
            const error = await response.json();
            console.error('❌ Failed to send OTP:', error.error);
            // Show OTP in console as fallback
            alert(`If email failed, use OTP: ${otp}`);
        }
    } catch (error) {
        console.warn('⚠️ Server not running. Use OTP 123456 for testing:', error);
        alert(`📱 Unable to send OTP. Using demo mode.\nOTP: ${otp}\n(For testing, use OTP: 123456)`);
    }
}

// ===== QUIZ LOGIC =====
let quizAnswers = {
    q1: null,
    q2: null,
    q3: null
};

function answerQuiz(answer, questionId) {
    if (!questionId) return;

    quizAnswers[questionId] = answer;
    updateQuizResult();
}

function updateQuizResult() {
    let result = document.getElementById("quizResult");
    let level = document.getElementById("quizLevel");

    let answeredCount = Object.values(quizAnswers).filter(value => value !== null).length;
    if (answeredCount < 3) {
        result.innerText = `Answer ${3 - answeredCount} more question${3 - answeredCount === 1 ? '' : 's'} to see your level.`;
        level.innerText = "";
        return;
    }

    let yesCount = Object.values(quizAnswers).filter(value => value === 'yes').length;
    let levelName = 'Beginner';
    if (yesCount >= 3) {
        levelName = 'Advanced';
    } else if (yesCount >= 1) {
        levelName = 'Intermediate';
    }

    result.innerText = `Quiz complete. You answered ${yesCount} yes out of 3.`;
    level.innerText = `Level: ${levelName}`;
}

// Routine Builder
// Store scores
let scores = {
    investigative: 0,
    social: 0,
    enterprising: 0,
    artistic: 0,
    realistic: 0,
    conventional: 0
};

// When user clicks answer
function selectAnswer(type) {
    scores[type]++;

    // Small feedback
    alert("Answer recorded!");
}

function handleOther(select, inputId) {
    let input = document.getElementById(inputId);
    if (select.value === 'other') {
        input.classList.remove('hidden');
    } else {
        input.classList.add('hidden');
    }
}

// Generate routine automatically
function generateRoutine() {

    let total = 0;
    for (let key in scores) {
        total += scores[key];
    }

    if (total === 0) {
        document.getElementById("routineResult").innerText =
            "Please answer some questions first!";
        return;
    }

    // Convert to percentages
    let result = "";
    for (let key in scores) {
        let percent = Math.round((scores[key] / total) * 100);
        result += `${key}: ${percent}% \n`;
    }

    // Simple mapping to routine
    let routine = "\nSuggested Focus:\n";

    if (scores.investigative > 0) routine += "📚 Academics & Research\n";
    if (scores.enterprising > 0) routine += "🎤 Debate & Leadership\n";
    if (scores.artistic > 0) routine += "✍️ Writing & Creativity\n";
    if (scores.realistic > 0) routine += "🏃 Fitness\n";
    if (scores.conventional > 0) routine += "📊 Planning & Tracking\n";
    if (scores.social > 0) routine += "🤝 Group Activities\n";

    document.getElementById("routineResult").innerText = result + routine;
}

// Pledge System
function makePledge() {
    let amount = document.getElementById("amount").value;

    let reward = Math.floor(amount * 1.15);

    document.getElementById("pledgeResult").innerText =
        `You pledged ₹${amount}. Complete tasks to earn ₹${reward}!`;
}

// Display percentages in routine builder
function quizQuestion() {
    let questions = [
        { question: "Do you enjoy public speaking?", id: "q1" },
        { question: "Are you interested in research?", id: "q2" },
        { question: "Do you prefer teamwork?", id: "q3" }
    ];

    let container = document.getElementById("quizContainer");
    container.innerHTML = "";

    questions.forEach(q => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p>${q.question}</p>
            <button onclick="answerQuiz('yes', '${q.id}')">Yes</button>
            <button onclick="answerQuiz('no', '${q.id}')">No</button>
        `;
        container.appendChild(div);
    });
}