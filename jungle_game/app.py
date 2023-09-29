from flask import Flask, render_template, request, jsonify
import pygame
import csv

app = Flask(__name__)

# Constants and functions for the game
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

rect_x = 400
rect_change_x = 0
ball_x = 50
ball_y = 50
ball_change_x = 5
ball_change_y = 5
score = 0

def save_score_to_csv(score):
    with open('scores.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([score])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_score', methods=['POST'])
def update_score():
    global score
    score += 1
    save_score_to_csv(score)
    return jsonify({'score': score})

if __name__ == "__main__":
    app.run(debug=True)
