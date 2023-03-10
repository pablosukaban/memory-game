import React from 'react';
import { Cell, DifficultyType, StyleType } from '../App';

type GridProps = {
    mainArray: Cell[];
    gridStyle: StyleType;
    handleRestartClick: () => void;
    handleCellClick: (itemId: string) => void;
    handleChangeDifficulty: (data: DifficultyType) => void;
};

export const Grid: React.FC<GridProps> = ({
    mainArray,
    gridStyle,
    handleCellClick,
    handleRestartClick,
    handleChangeDifficulty,
}) => {
    const isAllCorrect = mainArray.every((item) => item.isCorrect);

    return (
        <>
            <h1 className='board-title'>{isAllCorrect ? 'Победа!' : ''}</h1>
            <div className='difficulty-container'>
                <button
                    id='easy'
                    className='difficulty-btn'
                    onClick={() => handleChangeDifficulty('easy')}
                >
                    Легкий
                </button>
                <button
                    id='normal'
                    className='difficulty-btn difficulty-btn-active'
                    onClick={() => handleChangeDifficulty('normal')}
                >
                    Нормальный
                </button>
                <button
                    id='hard'
                    className='difficulty-btn'
                    onClick={() => handleChangeDifficulty('hard')}
                >
                    Тяжелый
                </button>
            </div>
            <div className='board-grid' style={gridStyle}>
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
        </>
    );
};
