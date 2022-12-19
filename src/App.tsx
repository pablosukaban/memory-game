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

export type StyleType = {
    gridTemplateColumns: string;
};

export const App = () => {
    const [mainArray, setMainArray] = useState<Cell[]>(getRandomArray);
    const [choiscesArray, setChoicesArray] = useState<Cell[]>([]);
    const [chosenDifficulty, setChosenDifficulty] =
        useState<DifficultyType>('normal');

    const difficultyOptions = {
        easy: {
            timeOut: 1500,
            gridNumber: 12,
            style: { gridTemplateColumns: 'repeat(4, 1fr)' },
        },
        normal: {
            timeOut: 1000,
            gridNumber: 16,
            style: { gridTemplateColumns: 'repeat(4, 1fr)' },
        },
        hard: {
            timeOut: 500,
            gridNumber: 24,
            style: { gridTemplateColumns: 'repeat(4, 1fr)' },
        },
    };

    const currentDifficulty = difficultyOptions[chosenDifficulty];

    const handleChangeDifficulty = (data: DifficultyType) => {
        setChosenDifficulty(data);

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
        setMainArray(() => getRandomArray(currentDifficulty.gridNumber));
    };

    useEffect(() => {
        if (choiscesArray.length === 2) {
            setTimeout(moveOver, currentDifficulty.timeOut);
        }
    }, [choiscesArray]);

    useEffect(() => {
        handleRestartClick();
    }, [chosenDifficulty]);

    return (
        <div className='wrapper'>
            <div className='container'>
                <ThemeButton />
                <Grid
                    handleCellClick={handleCellClick}
                    mainArray={mainArray}
                    handleRestartClick={handleRestartClick}
                    handleChangeDifficulty={handleChangeDifficulty}
                    gridStyle={currentDifficulty.style}
                />
            </div>
        </div>
    );
};
