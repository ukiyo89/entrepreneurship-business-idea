// ForgeX Backend Server
// This server handles email verification and OTP sending

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Store OTPs temporarily (in production, use Redis or database)
const otpStorage = {};
const verificationCodes = {};

// Configure email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// ===== SEND VERIFICATION EMAIL =====
app.post('/api/send-verification-email', async (req, res) => {
    try {
        const { email, code, name } = req.body;

        if (!email || !code) {
            return res.status(400).json({ error: 'Email and code required' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🔥 ForgeX - Email Verification',
            html: `
                <div style="font-family: Georgia, serif; background: #f7f1e3; padding: 20px;">
                    <h1 style="color: #4b2e2a;">Welcome to ForgeX! 🔥</h1>
                    <p>Hello ${name},</p>
                    <p>Thank you for creating an account. Please verify your email using the code below:</p>
                    <div style="background: #4b2e2a; color: #f7edd5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                        <h2 style="letter-spacing: 5px;">${code}</h2>
                    </div>
                    <p>This code will expire in 30 minutes.</p>
                    <p>Build Skills. Stake Discipline.</p>
                    <p style="color: #666; font-size: 12px;">If you didn't create this account, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        verificationCodes[email] = { code, createdAt: Date.now() };

        res.json({ success: true, message: 'Verification email sent' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send verification email' });
    }
});

// ===== SEND OTP =====
app.post('/api/send-otp', async (req, res) => {
    try {
        const { email, otp, name } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP required' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🔥 ForgeX - Two-Factor Authentication',
            html: `
                <div style="font-family: Georgia, serif; background: #f7f1e3; padding: 20px;">
                    <h1 style="color: #4b2e2a;">Two-Factor Authentication</h1>
                    <p>Hello ${name},</p>
                    <p>Your OTP for login is:</p>
                    <div style="background: #4b2e2a; color: #f7edd5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                        <h2 style="letter-spacing: 5px;">${otp}</h2>
                    </div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p style="color: #d32f2f; font-weight: bold;">Never share this OTP with anyone.</p>
                    <p style="color: #666; font-size: 12px;">If you didn't request this, please change your password immediately.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        otpStorage[email] = { otp, createdAt: Date.now() };

        res.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('OTP error:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

// ===== VERIFY OTP =====
app.post('/api/verify-otp', (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP required' });
        }

        const stored = otpStorage[email];

        if (!stored) {
            return res.status(400).json({ error: 'No OTP found for this email' });
        }

        // Check expiration (10 minutes)
        if (Date.now() - stored.createdAt > 600000) {
            delete otpStorage[email];
            return res.status(400).json({ error: 'OTP expired' });
        }

        if (stored.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        delete otpStorage[email];
        res.json({ success: true, message: 'OTP verified' });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// ===== VERIFY EMAIL CODE =====
app.post('/api/verify-email-code', (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ error: 'Email and code required' });
        }

        const stored = verificationCodes[email];

        if (!stored) {
            return res.status(400).json({ error: 'No verification code found' });
        }

        // Check expiration (30 minutes)
        if (Date.now() - stored.createdAt > 1800000) {
            delete verificationCodes[email];
            return res.status(400).json({ error: 'Code expired' });
        }

        if (stored.code !== code) {
            return res.status(400).json({ error: 'Invalid code' });
        }

        delete verificationCodes[email];
        res.json({ success: true, message: 'Email verified' });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🔥 ForgeX Server running on http://localhost:${PORT}`);
    console.log(`📧 Email service configured for: ${process.env.EMAIL_USER}`);
});
