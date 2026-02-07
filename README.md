🔐 ShieldAuth – Secure Web Application & Threat Hardening
📌 Project Overview

ShieldAuth is a beginner-friendly secure web authentication system that demonstrates how cybersecurity is not just about finding vulnerabilities, but also about building secure systems from the ground up.

This project focuses on:

Secure authentication & authorization

Password handling best practices

Input validation and sanitization

Session handling & access control

Threat hardening (brute-force protection)

It is built using HTML, CSS, and JavaScript only, making it easy to understand and run without backend setup.

🎯 Project Objectives

Understand how login systems work internally

Learn why password hashing is important

Implement session management

Prevent brute-force attacks

Apply role-based authorization

Maintain security event logs

🧱 Tech Stack

Frontend: HTML, CSS, JavaScript

Hosting: GitHub (source code)

No backend / database (security concepts simulated client-side for learning)

📁 Project Structure
shieldauth/
├── index.html
├── style.css
├── script.js
└── README.md

🚀 How to Run the Project
Method 1 — Run Locally (Recommended)

Download or clone this repository

Open the folder in VS Code

Double-click index.html

The project will open in your browser

Method 2 — Host Anywhere (Optional)

Upload the folder to Netlify / Vercel / GitHub Pages (if configured correctly)

🔑 Demo Credentials
Username	Password
admin	admin123
user	user123
🔐 Security Features Implemented
1️⃣ Authentication

Users must provide valid username and password to login

2️⃣ Password Hashing (Simulated)

Passwords are not stored in plaintext

Hashing is used to compare credentials (educational demo)

3️⃣ Input Validation & Sanitization

Empty inputs are blocked

Special characters are sanitized to prevent injection attacks

4️⃣ Session Handling

Logged-in users are stored in browser session storage

Users stay logged in until logout or browser close

5️⃣ Authorization (Role-Based Access Control)

Admin users see extra protected UI content

Normal users are restricted

6️⃣ Brute Force Protection (Threat Hardening)

After 3 failed login attempts, the account is temporarily locked

7️⃣ Security Logging

Login attempts, failures, lockouts, and logouts are recorded in real-time

🛡️ Threats Addressed
Threat	Protection
Brute-force login	Account lockout mechanism
Password exposure	Hashing before comparison
Input injection	Input sanitization
Unauthorized access	Role-based authorization
Session hijacking	Controlled session storage
🧠 Learning Outcomes

After completing this project, I learned:

How secure authentication systems are designed

Why password hashing is critical

How sessions work in web applications

How brute-force attacks occur and how to stop them

How authorization differs from authentication

How to think like a defender, not just an attacker

📸 Screenshots (Add Yours Here)

Add screenshots of:

Login page

Successful login

Admin dashboard view

Security logs panel

Account lockout message

📄 Security Design Summary

This system follows a defense-in-depth approach, applying multiple layers of protection:

Input validation at entry points

Secure credential handling

Session isolation

Role-based access control

Continuous monitoring via security logs

Even if one layer fails, others continue protecting the system.

✅ Internship Deliverables Checklist

✔ Complete source code
✔ Authentication & authorization flow
✔ Password handling logic
✔ Input validation
✔ Session management
✔ Threat hardening
✔ README documentation
✔ Screenshots-ready system

👩‍💻 Author

Saniya Maniyar
Cybersecurity Intern
