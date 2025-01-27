import React, { useState, useEffect } from 'react';

const Questions = () => {
    const [question, setQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('easy');

    const loadQuestion = async () => {
        const response = await fetch(`http://127.0.0.1:8000/get_question/${difficulty}`);
        const data = await response.json();
        setQuestion(data);
    };

    const checkAnswer = (selected) => {
        if (selected === question.answer) {
            setScore(score + 1);
            alert('Correct!');
        } else {
            alert('Wrong!');
        }
        loadQuestion();
    };

    useEffect(() => {
        loadQuestion();
    }, [difficulty]);

    return (
        <div>
            {question && (
                <div>
                    <h2>{question.question}</h2>
                    <div>
                        {question.options.map((option, index) => (
                            <button key={index} onClick={() => checkAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                    <div>Score: {score}</div>
                    <button onClick={() => setDifficulty('easy')}>Easy</button>
                    <button onClick={() => setDifficulty('medium')}>Medium</button>
                    <button onClick={() => setDifficulty('hard')}>Hard</button>
                </div>
            )}
        </div>
    );
};

export default Questions;