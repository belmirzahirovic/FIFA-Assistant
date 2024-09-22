FIFA Assistant

Table of Contents
1. Introduction
2. Features
3. Tech Stack
5. Setup Instructions
6. Configuration
7. Usage
8. API Endpoints
9. Database Schema
10. Frontend Components
11. Styling
12. Troubleshooting

Introduction

FIFA Assistant is a comprehensive web application designed for FIFA 24 enthusiasts. It provides a user-friendly interface to explore player data, compare player statistics, and create custom squads. Whether you're a casual player or a seasoned manager, FIFA Assistant offers tools to enhance your FIFA experience.

Features

1. Player Database
   - Access a vast database of FIFA 24 players
   - View detailed player attributes and statistics

2. Advanced Search
   - Search players by name, position, nation, club, or overall rating
   - Apply multiple filters for precise results

3. Player Comparison
   - Compare stats of two players side by side
   - Visualize differences in key attributes

4. Squad Builder
   - Create custom squads with an interactive pitch view
   - Drag and drop players into different positions

5. Player Details
   - View comprehensive player information
   - See chemistry links with other players

6. Responsive Design
   - Enjoy a seamless experience on desktop and mobile devices

Tech Stack

- Frontend: 
  - HTML5
  - CSS3 (with responsive design)
  - JavaScript (ES6+)
- Backend: 
  - Python 3.11
  - Flask 3.0.3
  - Flask-CORS 4.0.1
- Database: 
  - MySQL 8.0+
  - mysql-connector-python 8.4.0
- Development Tools:
  - Git for version control
  - Virtual environment for Python dependency management

Setup Instructions

1. Clone the repository:
   git clone [repository-url]
   cd FIFA-Assistant

2. Set up a virtual environment:
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. Install the required packages:
   pip install -r requirements.txt

4. Set up your MySQL database:
   - Create a new database named `diplomski_db`
   - Update the connection details in `app.py` if necessary

5. Run the data loader script to populate your database:
   python load_data.py

6. Start the Flask server:
   python app.py

7. Open your web browser and navigate to `http://localhost:5000` to access the application.

Configuration

The main configuration for the application is located in `app.py`. You may need to modify the following:

- Database connection details:
  conn = mysql.connector.connect(
      host='localhost',
      user='root',
      password='yourpassword',  
      database='diplomski_db'
  )

- Flask app configuration:
  app.config['DEBUG'] = True  # Set to False in production

Usage

1. Home Page: Browse featured players and use the search bar for quick access.
2. Players Page: View all players, apply filters, and click on a player for detailed information.
3. Compare Page: Select two players to compare their attributes side by side.
4. Squad Builder: Create your dream team by dragging and dropping players onto the pitch.
5. Player Bio: Click on a player's card to view detailed statistics and chemistry links.

API Endpoints

- /players (GET): Retrieve all players
- /nations (GET): Get list of all nations
- /clubs (GET): Get list of all clubs
- /overall_ratings (GET): Get list of all overall ratings
- /player_image (GET): Get player details by image link
- /search_players (GET): Search players by name
- /player_details (GET): Get detailed information for a specific player
- /chemistry_links (GET): Get chemistry links for a specific player

Database Schema

The `players` table includes the following fields:
- Name
- Overall_Rating
- Club
- Nation
- Position
- Foot
- Skill_Moves
- Weak_Foot
- Height
- Weight
- Age
- Various attribute fields (e.g., Acceleration, Sprint_Speed, etc.)

Frontend Components

1. Player Card: Displays basic player information in a FIFA-style card format.
2. Search Bar: Allows users to search for players by name.
3. Filter Dropdowns: Enable filtering of players by various attributes.
4. Comparison View: Side-by-side display of two players' attributes.
5. Squad Builder Pitch: Interactive football pitch for creating custom squads.

Styling

The application uses custom CSS for styling, with separate CSS files for different pages:
- styles.css: Global styles
- players.css: Styles for the players list page
- compare.css: Styles for the player comparison page
- builder.css: Styles for the squad builder page
- player_bio.css: Styles for individual player bio pages

The design is responsive and adapts to different screen sizes.

Troubleshooting

- Database Connection Issues: Ensure your MySQL server is running and the connection details in `app.py` are correct.
- Missing Player Images: Check that all player images are properly linked and exist in the correct directory.
- CORS Errors: Make sure Flask-CORS is properly configured if you're running the frontend and backend on different ports or domains.
