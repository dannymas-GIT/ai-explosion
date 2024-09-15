from flask import Flask, jsonify, request
from flask_cors import CORS 
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM your_table ORDER BY timestamp DESC LIMIT 100")
    data = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
