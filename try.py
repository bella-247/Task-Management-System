from sqlalchemy import create_engine

db_url = "sqlite:///task_management.db"
engine = create_engine(db_url)

try:
    with engine.connect() as conn:
        print("✅ Connection Successful!")
except Exception as e:
    print(f"❌ Connection Failed: {e}")
