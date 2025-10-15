# techTinder - Frontend

**techTinder** is a developer-focused platform that enables users to connect, chat in real-time, and follow each other.  
This frontend repository provides the user interface, real-time chat experience, notifications, and premium feature access.

---

## 🚀 Features

- Responsive and modern UI using **React.js** and **Tailwind CSS**
- Real-Time Chat using **Socket.io**
- User Authentication & Authorization integration with backend
- Follow/Unfollow Functionality
- Notifications system (real-time updates)
- Premium features access after **Razorpay / Stripe** payment
- State management using **Redux**
- Interactive UI components using **Daisy UI**
- Upcoming AI-powered features integration

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS, Daisy UI  
- **Real-Time Communication:** Socket.io  
- **Payments:** Razorpay / Stripe (upcoming)  
- **Deployment:** AWS / Netlify / Vercel  
- **Version Control:** Git + GitHub

---

## 📂 Project Structure

```bash
techTinder-frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # App pages
│   ├── redux/          # Redux store and slices
│   ├── services/       # API calls to backend
│   ├── utils/          # Helper functions
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── .env.example
├── package.json
└── README.md

⚙️ Installation & Setup
Follow the steps below to set up the frontend locally 👇

1️⃣ Clone the repository
bash
git clone https://github.com/vinamra05/techTinder-UI.git
cd techTinder-frontend
2️⃣ Install dependencies
bash
npm install
3️⃣ Create a .env file
Create a .env file in the root directory based on .env.example and add your environment variables:

env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_RAZORPAY_KEY=your_razorpay_key

4️⃣ Run the app
bash
npm start
The app will start on:

text
http://localhost:3000

📡 Available Scripts
Command	Description
npm start	Run the app in development mode
npm run build	Build the app for production


☁️ Deployment
The frontend  deployed using:

AWS Ec2

Connected to backend API for real-time features and payments

🧩 Upcoming Features
AI-powered developer insights using OpenAI API

Enhanced analytics dashboard



📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Vinamra
Frontend Developer – MERN Stack

Email: vinamrasharma0523@gmial.com

LinkedIn: https://www.linkedin.com/in/vinamrasharma/
