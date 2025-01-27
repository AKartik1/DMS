from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import random

app = FastAPI()

# Sample questions
questions = {
    "easy": [
        {"question": "What is a group in mathematics?", "options": ["A set with a binary operation", "A collection of numbers", "A type of function", "An ordered pair"], "answer": "A set with a binary operation"},
        {"question": "Which of the following is an example of a group?", "options": ["Integers under addition", "Real numbers under multiplication", "Natural numbers under addition", "All of the above"], "answer": "All of the above"},
        {"question": "In a group, what is the identity element?", "options": ["An element that does not change others", "An element that is always zero", "An element that is always one", "An element that can be any number"], "answer": "An element that does not change others"},
    ],
    "medium": [
        {"question": "What is the inverse of an element 'a' in a group?", "options": ["An element that combines with 'a' to give the identity", "An element that is always zero", "An element that is always one", "An element that can be any number"], "answer": "An element that combines with 'a' to give the identity"},
        {"question": "Which of the following properties must a group satisfy?", "options": ["Closure", "Associativity", "Identity", "All of the above"], "answer": "All of the above"},
        {"question": "What is a subgroup?", "options": ["A group within a group", "A set of numbers", "A type of function", "An ordered pair"], "answer": "A group within a group"},
    ],
    "hard": [
        {"question": "Which of the following is NOT a property of a group?", "options": ["Closure", "Associativity", "Distributivity", "Identity"], "answer": "Distributivity"},
        {"question": "In which of the following structures is the operation not necessarily commutative?", "options": ["Abelian group", "Group", "Field", "Ring"], "answer": "Group"},
        {"question": "What is the order of a group?", "options": ["The number of elements in the group", "The number of operations", "The number of identities", "The number of inverses"], "answer": "The number of elements in the group"},
    ],
}

@app.get("/")
async def root():
    return HTMLResponse(content="<h1>Welcome to the Quiz Game API</h1>")

@app.get("/get_question/{difficulty}")
async def get_question(difficulty: str):
    question = random.choice(questions[difficulty])
    return question

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)