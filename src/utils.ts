import { nanoid } from 'nanoid';
import { Cell, DifficultyType } from './App';

export function getCurrentDiff(data: DifficultyType) {
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
    return difficultyOptions[data];
}

export function getRandomArray(arrayLength = 16) {
    // 12 16 36

    let obj = '';

    // switch (arrayLength) {
    //     case 12:
    //         obj = '1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8';
    //         break;
    //     case 16:
    //         obj = '1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12';
    //         break;
    //     case 24:
    //         obj =
    //             '1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16';
    //         break;

    //     default:
    //         break;
    // }

    switch (arrayLength) {
        case 12:
            obj = '1,1,2,2,3,3,4,4,5,5,6,6';
            break;
        case 16:
            obj = '1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8';
            break;
        case 24:
            obj = '1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12';
            break;

        default:
            break;
    }

    const arr = obj.split(',').map((item) => {
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
