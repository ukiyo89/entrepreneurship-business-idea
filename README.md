<<<<<<< HEAD
# 🔥 ForgeX - Build Skills. Stake Discipline.

ForgeX is a comprehensive learning platform that combines authentication, email verification, OTP security, and interest-based learning activities to help users build knowledge in key areas.

## ✨ Features

### 1. **Secure Authentication System**
   - User registration with email and password
   - Email verification with verification codes
   - Two-Factor Authentication (2FA) with OTP
   - Secure login/logout
   - Password validation (minimum 6 characters)

### 2. **Email Verification**
   - 6-digit verification code sent to user's email
   - 30-minute expiration for verification codes
   - Resend functionality for codes

### 3. **OTP Security**
   - 6-digit OTP sent upon login
   - 10-minute expiration for OTP
   - Resend functionality for OTP

### 4. **Interest-Based Learning**
   - **📰 Current Affairs** - Stay updated with global news and events
   - **📚 Vocabulary Building** - Expand your vocabulary and communication skills
   - **🎤 Debate** - Master argumentation and public speaking
   - **🧠 General Knowledge** - Broaden knowledge across various fields

### 5. **Dashboard Features**
   - Personalized welcome message
   - Display of selected interests
   - Daily task tracking
   - Quiz system for interest assessment
   - Routine builder based on preferences
   - Pledge system for goals and challenges

## 📋 Project Structure

```
ForgeX/
├── index.html           # Main HTML file with all screens
├── script.js            # Frontend JavaScript logic
├── style.css            # CSS styling
├── server.js            # Backend Node.js server
├── package.json         # Dependencies
├── .env.example         # Environment variables template
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Gmail account with 2FA enabled (for email/OTP sending)

### Installation

1. **Clone or download the project**
   ```bash
   cd Entrepreneurship\ business\ idea
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Gmail credentials:
     ```
     EMAIL_USER=your_gmail@gmail.com
     EMAIL_PASSWORD=your_app_password
     ```
   
   **How to get Gmail App Password:**
   1. Go to https://myaccount.google.com/apppasswords
   2. Select "Mail" and "Windows Computer" (or your device)
   3. Copy the generated 16-character password
   4. Paste it into `.env` as `EMAIL_PASSWORD` (remove spaces)

### Running the Application

**Start the Backend Server:**
```bash
npm start
```
The server will run at `http://localhost:3000`

**Open the Frontend:**
- Open `index.html` in a web browser
- Or use a local server: `python -m http.server 8000` (Python 3)

## 🔐 Authentication Flow

### Registration
1. User enters name, email, and password
2. Account created and stored in localStorage
3. 6-digit verification code sent to email
4. User enters verification code to confirm email
5. Account is now verified and ready to login

### Login
1. User enters email and password
2. System verifies credentials
3. 6-digit OTP sent to user's email
4. User enters OTP to complete login
5. If first login, user selects interests
6. Dashboard is displayed with personalized content

### Interest Selection
- User selects from 4 main interest areas
- Interests are saved to user profile
- Dashboard displays selected interests
- Activities and quizzes are tailored based on interests

## 💾 Data Storage

### Frontend (localStorage)
- `users` - Array of all registered users
- `currentUser` - Currently logged-in user

### Backend (Temporary Storage)
- OTP codes with expiration
- Verification codes with expiration
- In production, use a database like MongoDB or PostgreSQL

## 📧 Email Templates

### Verification Email
- Contains 6-digit verification code
- Clean, branded design
- 30-minute expiration notice

### OTP Email
- Contains 6-digit OTP
- Security warning
- 10-minute expiration notice

## 🧪 Testing

### Demo Credentials
For testing without real email setup:
- **Verification Code:** 123456 (automatically accepted)
- **OTP:** 123456 (automatically accepted)

### Test User Registration
1. Enter any name
2. Use test email: `test@example.com`
3. Use password: `password123`
4. Use code: `123456` for verification
5. Use OTP: `123456` for login
6. Select interests and explore dashboard

## 🎯 Features Breakdown

### Home Dashboard
- Personalized greeting with user's name
- Display of selected interests
- Today's tasks list
- Progress tracking

### Interests Page
- 4 interactive interest cards
- Hover effects and visual feedback
- Click to select/deselect
- Submit to save selections

### Quiz Section
- 3 questions about user preferences
- Yes/No answers
- Real-time result calculation
- Skill level assessment (Beginner/Intermediate/Advanced)

### Routine Builder
- Questions about daily habits
- Dropdown selections for each question
- Other option with custom input
- Generates personalized routine suggestions

### Pledge System
- Select pledge amount (₹500, ₹1000, ₹2000)
- Track goals and commitments
- Display rewards calculation

## 🔄 API Endpoints (Backend)

- `POST /api/send-verification-email` - Send verification code
- `POST /api/send-otp` - Send OTP
- `POST /api/verify-otp` - Verify OTP code
- `POST /api/verify-email-code` - Verify email code
- `GET /api/health` - Server health check

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- localStorage API

### Backend
- Node.js
- Express.js
- Nodemailer
- CORS
- dotenv

## 📝 Security Notes

⚠️ **Important for Production:**
1. Use HTTPS instead of HTTP
2. Store passwords with bcrypt hashing
3. Use a proper database instead of localStorage
4. Implement rate limiting for OTP/email sending
5. Add CSRF protection
6. Use secure session management
7. Implement proper error handling
8. Add logging and monitoring

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Learning Outcomes

After using ForgeX, users will gain:
- Knowledge of current global affairs
- Expanded vocabulary and communication skills
- Debate and argumentation techniques
- General knowledge across multiple domains
- Discipline through pledge system
- Better learning habits through routine tracking

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Review the `.env` configuration
3. Ensure Node.js and dependencies are installed
4. Check if Gmail credentials are correct

## 🚀 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Password reset functionality
- [ ] Profile customization
- [ ] Learning progress tracking
- [ ] Activity history
- [ ] Social features (leaderboard, groups)
- [ ] Mobile app version
- [ ] AI-powered recommendations
- [ ] Gamification with badges and points
- [ ] Integration with external learning APIs

---

**Built with ❤️ for learners everywhere**

🔥 ForgeX - Build Skills. Stake Discipline.
=======
# entrepreneurship-business-idea
>>>>>>> 54a96db63deab6d1c9b15e307996128eee0180f9
