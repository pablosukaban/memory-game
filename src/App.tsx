import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

// TODO светлая тема, таймер

type Cell = {
    id: string;
    value: string;
    isPressed: boolean;
    isCorrect: boolean;
};

export const App = () => {
    const [mainArray, setMainArray] = useState<Cell[]>(getRandomArray);
    const [choiscesArray, setChoicesArray] = useState<Cell[]>([]);
    const [isLightTheme, setIsLightTheme] = useState(false);

    const isAllCorrect = mainArray.every((item) => item.isCorrect);

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

    const handleRestartClick = () => {
        setMainArray(getRandomArray);
    };

    const handleThemeClick = () => {
        const doc = document.documentElement;
        doc.classList.toggle('light-theme');

        if (document.documentElement.className.includes('light-theme')) {
            setIsLightTheme(true);
        } else {
            setIsLightTheme(false);
        }
    };

    useEffect(() => {
        if (choiscesArray.length === 2) {
            setTimeout(moveOver, 1500);
        }
    }, [choiscesArray]);

    return (
        <div className='container'>
            <button className='theme-btn' onClick={handleThemeClick}>
                {isLightTheme ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-moon'
                    >
                        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
                    </svg>
                ) : (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-sun'
                    >
                        <circle cx='12' cy='12' r='5'></circle>
                        <line x1='12' y1='1' x2='12' y2='3'></line>
                        <line x1='12' y1='21' x2='12' y2='23'></line>
                        <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
                        <line
                            x1='18.36'
                            y1='18.36'
                            x2='19.78'
                            y2='19.78'
                        ></line>
                        <line x1='1' y1='12' x2='3' y2='12'></line>
                        <line x1='21' y1='12' x2='23' y2='12'></line>
                        <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
                        <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
                    </svg>
                )}
            </button>
            <h1 className='board-title'>{isAllCorrect ? 'Победа!' : ''}</h1>
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
            <button onClick={handleRestartClick} className='restart-btn'>
                {isAllCorrect ? 'Еще раз' : ''}
            </button>
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
    return shuffle(arr);
}

function shuffle(array: Cell[]) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
