# populate tasks with mock data

from app import db
from app.models import Tasks
from app import create_app
from datetime import datetime

app = create_app()
mock_tasks = [
    {
        "title": "Build eCommerce Website",
        "description": "Develop an online store with payment integration",
        "status": "Not started",
        "isDone": False,
        "due_date": "Mon, Mar 30 2025",
        "priority": "high",
    },
    {
        "title": "Create Portfolio Website",
        "description": "Create a personal portfolio to showcase my work",
        "status": "In progress",
        "isDone": False,
        "due_date": "Fri, Apr 10 2025",
        "priority": "medium",
    },
    {
        "title": "Write Technical Blog Post",
        "description": "Write about the latest trends in web development",
        "status": "Completed",
        "isDone": True,
        "due_date": "Thu, Jan 10 2025",
        "priority": "low",
    },
    {
        "title": "Learn Advanced React.js",
        "description": "Dive deep into React hooks and context API",
        "status": "Not started",
        "isDone": False,
        "due_date": "Wed, Feb 15 2025",
        "priority": "high",
    },
    {
        "title": "Database Optimization for Hotel Management System",
        "description": "Improve performance of queries and indexing for the hotel app",
        "status": "In progress",
        "isDone": False,
        "due_date": "Mon, Mar 23 2025",
        "priority": "high",
    },
    {
        "title": "Attend Coding Bootcamp",
        "description": "Join a week-long coding bootcamp to learn Flask and SQLAlchemy",
        "status": "Completed",
        "isDone": True,
        "due_date": "Sun, Dec 20 2024",
        "priority": "medium",
    },
    {
        "title": "Complete AI Course",
        "description": "Finish the AI Fundamentals course on Coursera",
        "status": "In progress",
        "isDone": False,
        "due_date": "Sat, Mar 15 2025",
        "priority": "low",
    },
    {
        "title": "Revamp Personal Blog",
        "description": "Redesign my personal blog using TailwindCSS and React",
        "status": "Not started",
        "isDone": False,
        "due_date": "Mon, May 1 2025",
        "priority": "medium",
    },
    {
        "title": "Implement Unit Testing in Web App",
        "description": "Add unit tests for the existing codebase of the web app",
        "status": "In progress",
        "isDone": False,
        "due_date": "Fri, Apr 5 2025",
        "priority": "high",
    },
    {
        "title": "Write Research Paper on Data Structures",
        "description": "Prepare a paper on the importance of data structures in algorithm efficiency",
        "status": "Completed",
        "isDone": True,
        "due_date": "Mon, Jan 25 2025",
        "priority": "low",
    },
    {
        "title": "Develop Game in Unity",
        "description": "Create a 3D adventure game using Unity",
        "status": "Not started",
        "isDone": False,
        "due_date": "Fri, Jun 15 2025",
        "priority": "high",
    },
    {
        "title": "Start Freelance Web Development Business",
        "description": "Create a website to offer web development services to clients",
        "status": "In progress",
        "isDone": False,
        "due_date": "Thu, Apr 30 2025",
        "priority": "medium",
    },
    {
        "title": "Fix Bugs in Mobile App",
        "description": "Resolve UI and performance bugs in the mobile app for a client",
        "status": "Not started",
        "isDone": False,
        "due_date": "Mon, Feb 28 2025",
        "priority": "medium",
    },
    {
        "title": "Work on Open-Source Project",
        "description": "Contribute to an open-source project on GitHub related to machine learning",
        "status": "In progress",
        "isDone": False,
        "due_date": "Tue, Mar 10 2025",
        "priority": "low",
    },
    {
        "title": "Implement OAuth for Web App",
        "description": "Integrate OAuth authentication in the web application",
        "status": "Not started",
        "isDone": False,
        "due_date": "Fri, Apr 12 2025",
        "priority": "high",
    },
    {
        "title": "Conduct User Research for App",
        "description": "Survey users to understand their needs and improve app features",
        "status": "Completed",
        "isDone": True,
        "due_date": "Mon, Feb 5 2025",
        "priority": "low",
    },
    {
        "title": "Build Chatbot for Website",
        "description": "Develop a chatbot for customer support on my website",
        "status": "In progress",
        "isDone": False,
        "due_date": "Tue, Mar 20 2025",
        "priority": "medium",
    },
    {
        "title": "Complete Data Science Certification",
        "description": "Finish the Data Science certification on Udemy",
        "status": "Not started",
        "isDone": False,
        "due_date": "Thu, May 10 2025",
        "priority": "low",
    },
    {
        "title": "Refactor Old Codebase",
        "description": "Refactor and optimize legacy code to improve maintainability",
        "status": "In progress",
        "isDone": False,
        "due_date": "Mon, Apr 25 2025",
        "priority": "high",
    },
    {
        "title": "Create Interactive Resume",
        "description": "Build a resume website with interactive animations and effects",
        "status": "Completed",
        "isDone": True,
        "due_date": "Wed, Jan 15 2025",
        "priority": "medium",
    }
]

def populate_tasks():
    with app.app_context():
        for task in mock_tasks:
            task["due_date"] = datetime.strptime(task["due_date"], '%a, %b %d %Y').strftime('%Y-%m-%d')
            new_task = Tasks(**task, user_id=3)
            
            db.session.add(new_task)
        db.session.commit()
        print("Tasks populated successfully!")


if __name__ == "__main__":
    populate_tasks()