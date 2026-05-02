# 🚀 ForgeX Quick Setup Guide

## ⚡ Quick Start (5 minutes)

### Option 1: Frontend Only (No Email/OTP)
1. Open `index.html` in your browser
2. Use test credentials:
   - Email: `test@example.com`
   - Password: `password123`
   - Verification Code: `123456`
   - OTP: `123456`
3. Select interests and explore the dashboard

### Option 2: Full Setup with Email (Backend)

#### Step 1: Install Node.js
- Download from https://nodejs.org/
- Choose LTS version
- Install and verify: `node --version`

#### Step 2: Setup Project
```bash
cd "Entrepreneurship business idea"
npm install
```

#### Step 3: Configure Gmail (2 minutes)
1. Go to https://myaccount.google.com
2. Click "Security" in left menu
3. Enable "2-Step Verification" (if not already enabled)
4. Go to https://myaccount.google.com/apppasswords
5. Select "Mail" and "Windows Computer"
6. Copy the 16-character password
7. Create `.env` file in project folder:
```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=paste_your_16_char_password_here
PORT=3000
```

#### Step 4: Start Server
```bash
npm start
```
Expected output:
```
🔥 ForgeX Server running on http://localhost:3000
📧 Email service configured for: your_gmail@gmail.com
```

#### Step 5: Open in Browser
- Open `index.html` in your browser
- Or: `http://localhost:3000/index.html`
- Real emails will now be sent!

## 🧪 Testing the App

### Register New Account
1. Click "Register here" link
2. Fill in form:
   - Name: `John Doe`
   - Email: `your_email@gmail.com`
   - Password: `password123`
3. Check email inbox for verification code
4. Enter code and verify
5. Login with email and password
6. Check email for OTP
7. Enter OTP
8. Select your interests
9. 🎉 Welcome to ForgeX!

### Quick Test Without Email
1. Register: Use `test@test.com` / `password123`
2. Verification: Use code `123456`
3. Login: Use `test@test.com` / `password123`
4. OTP: Use `123456`
5. Done! 

## 📱 Screens Overview

| Screen | Purpose | What to Do |
|--------|---------|-----------|
| Login | Enter credentials | Email & password |
| Register | Create account | Name, email, password |
| Email Verification | Confirm email | Enter verification code |
| OTP Verification | Confirm identity | Enter OTP code |
| Interests | Choose learning areas | Click interest cards |
| Home Dashboard | Main screen | View your profile & tasks |
| Quiz | Answer questions | Answer 3 quick questions |
| Routine | Daily habits | Select your routine |
| Pledge | Set goals | Choose pledge amount |

## ⚙️ Configuration

### Environment Variables (.env)
```
EMAIL_USER=        # Your Gmail address
EMAIL_PASSWORD=    # Your App Password (16 chars)
PORT=3000         # Server port (optional)
```

### Frontend Settings
- Edit `script.js` for:
  - Interest categories
  - Quiz questions
  - Routine options
  - Colors and themes

- Edit `style.css` for:
  - Colors: `#4b2e2a` (dark), `#f7f1e3` (light)
  - Fonts: Georgia serif
  - Responsive design

## 🔧 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "Error: connect ECONNREFUSED" in browser
- Make sure server is running: `npm start`
- Check port 3000 is not in use

### "Email failed to send"
1. Check `.env` file exists and has correct credentials
2. Verify Gmail App Password (not regular password)
3. Check internet connection
4. Verify Gmail 2FA is enabled

### "Verification code not working"
- Use `123456` for testing (demo code)
- Or check email inbox for actual code
- Codes expire after 30 minutes

### "OTP not working"
- Use `123456` for testing (demo OTP)
- Or check email for actual OTP
- OTP expires after 10 minutes

### App won't load
1. Ensure `index.html`, `script.js`, `style.css` are in same folder
2. Open index.html directly or use a local server
3. Check browser console (F12) for errors

## 📚 Project Files Explained

```
index.html
  ├─ Login screen
  ├─ Register screen
  ├─ Email verification
  ├─ OTP verification
  ├─ Interest selection
  ├─ Home dashboard
  ├─ Quiz
  ├─ Routine builder
  └─ Pledge system

script.js
  ├─ Authentication logic
  ├─ Email/OTP verification
  ├─ Interest management
  ├─ Dashboard updates
  ├─ Quiz system
  ├─ Routine builder
  └─ Pledge system

style.css
  ├─ Layout & positioning
  ├─ Colors & themes
  ├─ Responsive design
  └─ Interactive elements

server.js
  ├─ Email sending
  ├─ OTP verification
  ├─ Email code verification
  └─ Health check

package.json
  └─ Dependencies: express, nodemailer, cors, dotenv
```

## 🎯 Next Steps

1. **Customize the App**
   - Change interests in HTML
   - Modify colors in CSS
   - Add more quiz questions

2. **Add Database**
   - Replace localStorage with MongoDB
   - Store user data permanently
   - Implement user sessions

3. **Deploy Online**
   - Use Heroku, Vercel, or AWS
   - Setup environment variables
   - Configure production email service

4. **Add More Features**
   - Video lessons
   - Progress tracking
   - Social features
   - Certificates

## 🆘 Need Help?

1. Check error messages in browser console (F12)
2. Review README.md for detailed info
3. Check console.log messages from script.js
4. Verify email configuration
5. Test with demo credentials first

## 📖 Documentation

- **Full Documentation:** See `README.md`
- **API Reference:** See `server.js` comments
- **Frontend Code:** See `script.js` comments
- **HTML Structure:** See `index.html` comments

---

**That's it! You're ready to use ForgeX! 🔥**

Build Skills. Stake Discipline.
