# Full Stack Task Management System

A modern, responsive task management application built with React and Flask, featuring user authentication, task organization, and a dynamic theme switcher.

## 🚀 Features

- **User Authentication**
  - Secure JWT-based authentication
  - User registration and login
  - Protected routes

- **Task Management**
  - Create, read, update, and delete tasks
  - Task prioritization (High, Medium, Low)
  - Task status tracking (Not started, In progress, Completed)
  - Due date management
  - Task filtering and sorting

- **User Interface**
  - Responsive design
  - Dark/Light theme toggle
  - Modern and clean UI
  - Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- React (v19.0.0)
- Vite
- React Router DOM (v7.2.0)
- Axios for API calls
- React Icons
- React Toastify
- Headless UI
- Hero Icons

### Backend
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- Flask-Bcrypt
- Flask-Marshmallow
- SQLite Database

## 📋 Prerequisites

- Python 3.8+
- Node.js 18.18.0+
- npm or yarn

## 🔧 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```env
SQLALCHEMY_DATABASE_URI=sqlite:///tasks.db
JWT_SECRET_KEY=your-secret-key
```

5. Initialize the database:
```bash
flask db upgrade
python populate_tasks.py  # Optional: Add sample data
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd Backend/Flask_app
flask run
```
The backend will start on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd Frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
├── Backend/
│   ├── Flask_app/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── __init__.py
│   │   ├── migrations/
│   │   └── requirements.txt
│   └── .gitignore
└── Frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/<id>` - Update task
- `DELETE /tasks/<id>` - Delete task

## 🎨 Features in Detail

### Task Properties
- Title
- Description
- Priority (high/medium/low)
- Status (Not started/In progress/Completed)
- Due Date
- Reminder Time

### Theme Support
- Light and Dark mode
- Persistent theme preference
- Smooth theme transitions

## 🔒 Security Features

- Password hashing with Bcrypt
- JWT token authentication
- Protected API routes
- CORS protection
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React + Vite template
- Flask documentation
- SQLAlchemy documentation
