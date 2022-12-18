import React from 'react';
import { ClosestColor, ColorArray, LocationType, SourceColorType, Target } from '../types';
import Circle from './circle';
import Square from './square';

type BoardProps = {
    colorArray: ColorArray
    sourceColor: SourceColorType,
    sourceClickable: boolean,
    closeColor: ClosestColor,
    onColorChange: (location: LocationType, color?:Target) => void
}

export default function Board({colorArray,sourceColor, closeColor, sourceClickable, onColorChange}: BoardProps) {
    // console.log(colorArray)
    return <div style={{width:'fit-content',paddingTop:'1rem'}}>
        {colorArray[0].map((color, i) => <Circle clickable={sourceClickable} onColorChange={onColorChange} key={i} color={ sourceColor[`x-top-${i}`] || [0,0,0]} location={{x:i,side:'top'}} />)}
        {colorArray.map((row, i) =>  
        //  row 
            <div key={i}>
                <Circle clickable={sourceClickable} onColorChange={onColorChange} color={sourceColor[`y-left-${i}`] || [0,0,0]} location={{y:i,side:'left'}} />
                {row.map((color, j) => {
                    return <Square close={(i === closeColor.position.y && j === closeColor.position.x) ? true : false } draggable={!sourceClickable} key={`${i}${j}`} color={color} />
                })}
                <Circle  clickable={sourceClickable}onColorChange={onColorChange} color={sourceColor[`y-right-${i}`] || [0,0,0]} location={{y:i,side:'right'}} />

            </div>
        )}
        {colorArray[0].map((color, i) => <Circle clickable={sourceClickable} onColorChange={onColorChange} key={`2${i}`} color={sourceColor[`x-bottom-${i}`] || [0,0,0]} location={{x:i,side:'bottom'}} />)}

    </div>
}
