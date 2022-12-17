import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

type Cell = {
    id: string;
    value: string;
    isPressed: boolean;
    isCorrect: boolean;
};

export const App = () => {
    const [mainArray, setMainArray] = useState<Cell[]>(getRandomArray);
    const [choiscesArray, setChoicesArray] = useState<Cell[]>([]);

    const hideAllCells = () => {
        const allClearArray = mainArray.map((item) => ({
            ...item,
            isPressed: item.isCorrect,
        }));
        setMainArray(allClearArray);
    };

    const moveOver = () => {
        hideAllCells();

        if (choiscesArray[0].value === choiscesArray[1].value) {
            const guessedRightArray = mainArray.map((item) => {
                if (item.value === choiscesArray[0].value) {
                    return { ...item, isCorrect: true, isPressed: true };
                } else {
                    return item;
                }
            });
            setMainArray(guessedRightArray);
        }

        setChoicesArray([]);
    };

    const handleCellClick = (givenId: string) => {
        const clickedCell = mainArray.find((item) => givenId === item.id);

        if (!clickedCell) return;
        if (choiscesArray.length === 2) return;
        setChoicesArray((prev) => [...prev, clickedCell]);

        const clickedArr = mainArray.map((item) => {
            if (givenId === item.id) {
                return { ...item, isPressed: true };
            }
            return item;
        });
        setMainArray(clickedArr);
    };

    useEffect(() => {
        if (choiscesArray.length === 2) {
            setTimeout(moveOver, 1500);
        }
    }, [choiscesArray]);

    return (
        <div className='container'>
            <div className='board-grid'>
                {mainArray.map((item) => (
                    <button
                        key={item.id}
                        className='board-cell'
                        onClick={() => handleCellClick(item.id)}
                        disabled={item.isCorrect}
                    >
                        <span
                            style={{ opacity: item.isPressed ? '1' : '0' }}
                            className='cell-text'
                        >
                            {item.value}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

function getRandomArray() {
    const allChoices = '1122334455667788';
    const arr = allChoices.split('').map((item) => {
        const newObj: Cell = {
            id: nanoid(),
            value: item,
            isPressed: false,
            isCorrect: false,
        };
        return newObj;
    });
    return arr;
}
