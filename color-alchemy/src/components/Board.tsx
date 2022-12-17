import React from 'react';
import { ColorArray, LocationType, SourceColorType, Target } from '../types';
import Circle from './circle';
import Square from './square';

type BoardProps = {
    colorArray: ColorArray
    sourceColor: SourceColorType,
    onColorChange: (location: LocationType, color?:Target) => void
}

export default function Board({colorArray,sourceColor, onColorChange}: BoardProps) {
    console.log(colorArray)
    return <div>
        {colorArray[0].map((color, i) => <Circle onColorChange={onColorChange} key={i} color={ sourceColor[`x-top-${i}`] || [0,0,0]} location={{x:i,side:'top'}} />)}
        {colorArray.map((row, i) =>  
        //  row 
            <div key={i}>
                <Circle onColorChange={onColorChange} color={sourceColor[`y-left-${i}`] || [0,0,0]} location={{y:i,side:'left'}} />
                {row.map((color, j) => {
                    return <Square draggable key={`${i}${j}`} color={color} />
                })}
                <Circle onColorChange={onColorChange} color={sourceColor[`y-right-${i}`] || [0,0,0]} location={{y:i,side:'right'}} />

            </div>
        )}
        {colorArray[0].map((color, i) => <Circle onColorChange={onColorChange} key={`2${i}`} color={sourceColor[`x-bottom-${i}`] || [0,0,0]} location={{x:i,side:'bottom'}} />)}

    </div>
}
