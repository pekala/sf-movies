# Ideas
- N answers to select from
- Answer could be:
    + Place
        * name
        * map with pin
    + Actor
    + Movie
    + Production company
- N seconds to answer the question
- N points for guessing with the first hint
- N hints to help you guess, each showing up after a fraction of time
- Hint types could be:
    + Picture (movie posters, actor pictures, place pictures etc.)
    + Text (movie title, tagline etc.)
    + Map (with pins)
- each time you see a hint, you get less points
- if you guess wrong, you lose points

# Types

Question:
    questionType: enum
    place: Place
    answers: string[] | Coordinates[]
    correctAnswer: string | Coordinates
    hints: Hint[]
    timeLeft: number
    points: number
    wasAnswered: boolean
    wasAnsweredCorrectly: boolean

Place: 
    location: Coordinates
    address: string
    name: string

Hint:
    hintType: enum
    value: string | Coordinates

Coordinates:
    lan: number
    lgt: number
