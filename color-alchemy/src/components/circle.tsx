
import React, { useEffect, useRef, DragEvent } from 'react'
import { LocationType, Target } from '../types'

type CircleProps = {
    color: Target,
    location: LocationType,
    clickable?: boolean,
    onColorChange: (location: LocationType,color?:Target) => void
}

export default function Circle({ color,location, clickable ,onColorChange } : CircleProps) {
    const element = useRef<HTMLDivElement>(null)

    function onDrag(e:DragEvent<HTMLDivElement>) {
        e.stopPropagation()
        e.preventDefault()
    }

    function onDrop(e:DragEvent<HTMLDivElement>) {
      e.stopPropagation()
      e.preventDefault()
      const color = e.dataTransfer?.getData('text/plain')
      onColorChange(location, color?.split(',').map(c => parseInt(c)) as Target)
  }

 
  return (
    <div
        onClick={() => clickable && onColorChange(location)}
        onDragOver={onDrag}
        onDragEnter={onDrag}
        onDrop={onDrop}
        ref={element}
      style={{

        display:'inline-block',
        width: '30px',
        height: '30px',
        margin: '2px',
        borderRadius:  '50%',
        border: '2px solid #ccc',
        cursor: clickable ? 'pointer' : 'no-drop',
        backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
      }}
      title={color.join(',')}
    />
  )
}