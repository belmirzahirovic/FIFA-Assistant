from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import mysql.connector
import logging

app = Flask(__name__, static_folder='Frontend')
CORS(app)

logging.basicConfig(level=logging.DEBUG)

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='belmirzahirovic98',  
            database='diplomski_db'
        )
        return conn
    except mysql.connector.Error as err:
        app.logger.error(f"Error connecting to the database: {err}")
        return None

@app.route('/players', methods=['GET'])
def get_players():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM players')
        players = cursor.fetchall()
        cursor.close()
        conn.close()

        
        for player in players:
            app.logger.debug(f"Player data: {player}")

        return jsonify(players)
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching players: {err}")
        return jsonify({'error': 'Failed to fetch players'}), 500
        
    
@app.route('/nations', methods=['GET'])
def get_nations():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    
    try:
        cursor = conn.cursor()
        cursor.execute('SELECT DISTINCT Nation FROM players')
        nations = cursor.fetchall()
        cursor.close()
        conn.close()

        nation_list = [nation[0] for nation in nations]

        return jsonify(nation_list)
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching nations: {err}")
        return jsonify({'error': 'Failed to fetch nations'}), 500

@app.route('/clubs', methods=['GET'])
def get_clubs():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    
    try:
        cursor = conn.cursor()
        cursor.execute('SELECT DISTINCT Club FROM players')
        clubs = cursor.fetchall()
        cursor.close()
        conn.close()

        
        club_list = [club[0] for club in clubs]

        return jsonify(club_list)
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching clubs: {err}")
        return jsonify({'error': 'Failed to fetch clubs'}), 500
    
@app.route('/overall_ratings', methods=['GET'])
def get_overall_ratings():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    
    try:
        cursor = conn.cursor()
        cursor.execute('SELECT DISTINCT Overall_Rating FROM players')
        overall_ratings = cursor.fetchall()
        cursor.close()
        conn.close()

        
        overall_list = [rating[0] for rating in overall_ratings]

        return jsonify(overall_list)
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching overall ratings: {err}")
        return jsonify({'error': 'Failed to fetch overall ratings'}), 500
    

@app.route('/player_image', methods=['GET'])
def get_player_by_image():
    image_link = request.args.get('image_link')
    if not image_link:
        return jsonify({'error': 'Image link is required'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM players WHERE Image_Link = %s', (image_link,))
        player = cursor.fetchone()
        cursor.close()
        conn.close()

        if player:
            return jsonify(player)
        else:
            return jsonify({'error': 'Player not found'}), 404
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching player by image: {err}")
        return jsonify({'error': 'Failed to fetch player'}), 500
    
@app.route('/search_players', methods=['GET'])
def search_players():
    search_term = request.args.get('query', '')
    if not search_term:
        return jsonify([])

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        cursor = conn.cursor()
        query = "SELECT DISTINCT Name FROM players WHERE Name LIKE %s LIMIT 10"
        cursor.execute(query, ('%' + search_term + '%',))
        players = cursor.fetchall()
        cursor.close()
        conn.close()

        player_names = [player[0] for player in players]
        return jsonify(player_names)
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching player names: {err}")
        return jsonify({'error': 'Failed to fetch player names'}), 500
    
@app.route('/player_details', methods=['GET'])
def get_player_details():
    player_name = request.args.get('name', '')
    if not player_name:
        return jsonify({'error': 'Player name is required'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM players WHERE Name = %s', (player_name,))
        player = cursor.fetchone()
        cursor.close()
        conn.close()

        if player:
            return jsonify(player)
        else:
            return jsonify({'error': 'Player not found'}), 404
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching player details: {err}")
        return jsonify({'error': 'Failed to fetch player details'}), 500


@app.route('/chemistry_links', methods=['GET'])
def get_chemistry_links():
    player_name = request.args.get('name', '')
    if not player_name:
        return jsonify({'error': 'Player name is required'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM players WHERE Name = %s', (player_name,))
        player = cursor.fetchone()
        if not player:
            return jsonify({'error': 'Player not found'}), 404
        
        cursor.execute('''
            SELECT * FROM players 
            WHERE (Nation = %s OR Club = %s) AND Name != %s
        ''', (player['Nation'], player['Club'], player_name))
        chemistry_links = cursor.fetchall()
        cursor.close()
        conn.close()

        return jsonify(chemistry_links)
    except mysql.connector.Error as err:
        app.logger.error(f"Error fetching chemistry links: {err}")
        return jsonify({'error': 'Failed to fetch chemistry links'}), 500

    


@app.route('/')
def serve_index():
    return send_from_directory('Frontend', 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory('Frontend', filename)

if __name__ == '__main__':
    app.run(debug=True)
