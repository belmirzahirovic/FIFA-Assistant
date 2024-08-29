import pandas as pd
import mysql.connector

df = pd.read_csv('cleaned_player_dataset.csv')

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='belmirzahirovic98',  
    database='diplomski_db'
)

cursor = conn.cursor()

for _, row in df.iterrows():
    cursor.execute(
        """
        INSERT INTO players (Name, Overall_Rating, Club, Nation, Position, Foot, Skill_Moves, Weak_Foot, Height, Weight, Age, Acceleration, Sprint_Speed, Att_Position, Finishing, Shot_Power, Long_Shots, Volleys, Penalties, Vision, Crossing, FK_Acc, Short_Pass, Long_Pass, Curve, Agility, Balance, Reactions, Ball_Control, Dribbling, Composure, Interceptions, Heading_Acc, Def_Aware, Stand_Tackle, Slide_Tackle, Jumping, Stamina, Strength, Aggression, Att_Def_WR)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            row['Name'], row['Overall Rating'], row['Club'], row['Nation'], row['Position'], row['Foot'],
            row['Skill Moves'], row['Weak Foot'], row['Height'], row['Weight'], row['Age'], row['Acceleration'],
            row['Sprint Speed'], row['Att. Position'], row['Finishing'], row['Shot Power'], row['Long Shots'],
            row['Volleys'], row['Penalties'], row['Vision'], row['Crossing'], row['FK. Acc.'], row['Short Pass'],
            row['Long Pass'], row['Curve'], row['Agility'], row['Balance'], row['Reactions'], row['Ball Control'],
            row['Dribbling'], row['Composure'], row['Interceptions'], row['Heading Acc.'], row['Def. Aware'],
            row['Stand Tackle'], row['Slide Tackle'], row['Jumping'], row['Stamina'], row['Strength'],
            row['Aggression'], row['Att/Def WR']
        )
    )

conn.commit()

cursor.close()
conn.close()

