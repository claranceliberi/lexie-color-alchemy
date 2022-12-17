
import React, { DragEvent, DragEventHandler, useEffect, useRef } from 'react'
import { Target } from '../types'

type SquareProps = {
    color: Target
    close?: boolean
    draggable?: boolean
}

export default function Square({ color, close,draggable = false } : SquareProps) {
  

  function onDrag(e:DragEvent<HTMLDivElement>){
      console.log('dragstart', color.join(','))
      e.dataTransfer!.setData("text/plain", color.join(','))
  }
  useEffect(() => {

  
    return () => {
      // element.current?.removeEventListener('dragstart', (e) => 0)
    }
  }, [])
  
  return (
    <div draggable={draggable}
      onDragStart={ onDrag}
      className='square'
      style={{
        display:'inline-block',
        width: '30px',
        height: '30px',
        border: `2px solid ${close ? 'red' : '#ccc'}`,
        margin: '2px',
        borderRadius:  '2px',
        cursor: draggable ? 'grab' : 'default',
        backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        
      }}
    />
  )
}