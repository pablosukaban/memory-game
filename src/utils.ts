import { nanoid } from 'nanoid';
import { Cell } from './App';

export function getRandomArray() {
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
