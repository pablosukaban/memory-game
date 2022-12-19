import React, { useEffect, useState } from 'react';
import { Grid } from './components/Grid';
import { ThemeButton } from './components/ThemeButton';
import { getRandomArray } from './utils';
import './App.css';

// TODO таймер, сложность

export type Cell = {
    id: string;
    value: string;
    isPressed: boolean;
    isCorrect: boolean;
};

export type DifficultyType = 'easy' | 'normal' | 'hard';

export const App = () => {
    const [mainArray, setMainArray] = useState<Cell[]>(getRandomArray);
    const [choiscesArray, setChoicesArray] = useState<Cell[]>([]);
    const [currentDifficulty, setCurrentDifficulty] =
        useState<DifficultyType>('normal');

    const difficultyOptions = {
        easy: { timeOut: 2000, gridNumber: 16 },
        normal: { timeOut: 1000, gridNumber: 16 },
        hard: { timeOut: 500, gridNumber: 25 },
    };

    const handleChangeDifficulty = (data: DifficultyType) => {
        setCurrentDifficulty(data);
        handleRestartClick();

        const btns = document.querySelectorAll('.difficulty-btn');
        const clickedBtn = document.getElementById(data) as HTMLButtonElement;
        btns.forEach((element) => {
            element.classList.remove('difficulty-btn-active');
        });
        clickedBtn.classList.add('difficulty-btn-active');
    };

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

    useEffect(() => {
        if (choiscesArray.length === 2) {
            setTimeout(moveOver, difficultyOptions[currentDifficulty].timeOut);
        }
    }, [choiscesArray]);

    return (
        <div className='container'>
            <ThemeButton />
            <Grid
                handleCellClick={handleCellClick}
                mainArray={mainArray}
                handleRestartClick={handleRestartClick}
                handleChangeDifficulty={handleChangeDifficulty}
            />
        </div>
    );
};
