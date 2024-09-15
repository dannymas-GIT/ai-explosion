import sqlite3

def init_db():
    conn = sqlite3.connect('database.sqlite')
    cursor = conn.cursor()

    # Create the table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS your_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Insert some sample data
    sample_data = [
        ('Item 1', 10.5),
        ('Item 2', 20.7),
        ('Item 3', 15.2),
    ]
    cursor.executemany('INSERT INTO your_table (name, value) VALUES (?, ?)', sample_data)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()
