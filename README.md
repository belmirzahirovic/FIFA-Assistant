# FIFA Assistant

FIFA Assistant is a web application that provides information about FIFA 24 players, allowing users to search, compare, and build squads with their favorite football stars.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Chemistry Links](#chemistry-links)

## Features

- Browse and search through a database of FIFA 24 players
- View detailed player information, including attributes and ratings
- Compare players side-by-side
- Build custom squads with an interactive pitch view
- Filter players by various criteria such as position, nation, club, and overall rating

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
- Backend:
  - Python
  - Flask
  - MySQL
- Other:
  - Flask-CORS for handling Cross-Origin Resource Sharing
  - MySQL Connector for database interactions

## Project Structure

The project is structured as follows:

```
fifa-assistant/
├── app.py
├── load_data.py
├── requirements.txt
├── pyvenv.cfg
├── Frontend/
│   ├── index.html
│   ├── players.html
│   ├── builder.html
│   ├── compare.html
│   ├── player_bio.html
│   ├── styles.css
│   ├── players.css
│   ├── builder.css
│   ├── compare.css
│   └── player_bio.css
└── images/
    └── (various image files)
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fifa-assistant.git
   cd fifa-assistant
   ```

2. Set up a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the MySQL database:
   - Create a new database named `diplomski_db`
   - Update the database connection details in `app.py` if necessary

5. Load the player data into the database:
   ```
   python load_data.py
   ```

## Usage

1. Start the Flask server:
   ```
   python app.py
   ```

2. Open your web browser and navigate to `http://localhost:5000`

3. Explore the different features of the FIFA Assistant:
   - Browse players on the main page
   - Use the search functionality to find specific players
   - Compare players on the comparison page
   - Build your dream squad using the squad builder

## API Endpoints

The application provides the following API endpoints:

- `GET /players`: Retrieve all players
- `GET /nations`: Get a list of all nations
- `GET /clubs`: Get a list of all clubs
- `GET /overall_ratings`: Get a list of all overall ratings
- `GET /player_image`: Get player details by image link
- `GET /search_players`: Search for players by name
- `GET /player_details`: Get detailed information about a specific player
- `GET /chemistry_links`: Get chemistry links for a specific player

## Chemistry Links

The FIFA Assistant implements a simple algorithm to determine player chemistry links. This feature is used in the squad builder to suggest compatible players.

How it works:
1. When a player is selected, the application queries the database for other players who share the same nation or club.
2. The query excludes the selected player from the results.
3. The frontend displays these chemistry links, allowing users to easily identify and select compatible players for their squad.

Example query (from `app.py`):
```python
cursor.execute('''
    SELECT * FROM players 
    WHERE (Nation = %s OR Club = %s) AND Name != %s
''', (player['Nation'], player['Club'], player_name))
```

This feature enhances the squad-building experience by suggesting players that would have good chemistry in the game.
