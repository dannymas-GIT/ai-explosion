from flask import Flask, request, jsonify

from dotenv import load_dotenv

import os

import requests

import logging

from flask_cors import CORS

from openai import OpenAI


# Set up logging

logging.basicConfig(level=logging.DEBUG)

logger = logging.getLogger(__name__)


# Load environment variables from .env file

load_dotenv()


app = Flask(__name__)

CORS(app)


# Initialize the OpenAI client

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route('/api/search')

def search():

    query = request.args.get('query')

    if not query:

        logger.error("No query provided")

        return jsonify({"error": "No query provided"}), 400

    

    if len(query) < 5:

        logger.error("Query is too short")

        return jsonify({"error": "Query must be at least 5 characters long"}), 400


    tavily_api_key = os.getenv('TAVILY_API_KEY')

    if not tavily_api_key:

        logger.error("Tavily API key not set")

        return jsonify({"error": "Tavily API key not set"}), 500


    try:

        logger.debug(f"Using Tavily API key: {tavily_api_key[:5]}...")

        payload = {

            "api_key": tavily_api_key,

            "query": query,

            "search_depth": "advanced",

            "include_images": True,

            "get_answer": True

        }

        logger.debug(f"Sending request to Tavily API with payload: {payload}")

        

        response = requests.post('https://api.tavily.com/search', json=payload)

        logger.debug(f"Tavily API response status code: {response.status_code}")

        logger.debug(f"Tavily API response content: {response.text[:200]}...")  # Log first 200 chars of response

        

        response.raise_for_status()

        return jsonify(response.json())

    except requests.RequestException as e:

        logger.error(f"Tavily API error: {str(e)}")

        logger.error(f"Response content: {e.response.text if e.response else 'No response'}")

        return jsonify({"error": f"Error communicating with Tavily API: {str(e)}", "details": e.response.text if e.response else 'No response content'}), 500


@app.route('/api/chat', methods=['POST'])

def chat():

    data = request.json

    logger.debug(f"Received chat request: {data}")

    if not data or 'message' not in data:

        logger.error("No message provided in chat request")

        return jsonify({"error": "No message provided"}), 400


    user_message = data['message']

    

    try:

        logger.debug(f"OpenAI API key: {client.api_key[:5]}...")  # Log first 5 chars of API key

        logger.debug(f"Sending request to OpenAI API with message: {user_message}")

        response = client.chat.completions.create(

            model="gpt-4",

            messages=[{"role": "user", "content": user_message}]

        )

        logger.debug(f"OpenAI API response: {response}")

        

        if response.choices and len(response.choices) > 0:

            ai_message = response.choices[0].message.content

            return jsonify({"response": ai_message})

        else:

            logger.error("No response content from OpenAI API")

            return jsonify({"error": "No response content"}), 500

    except Exception as e:

        logger.error(f"Error calling OpenAI API: {str(e)}")

        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
