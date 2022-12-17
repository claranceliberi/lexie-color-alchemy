import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ClosestColor, ColorArray, LocationType, Response, SourceColorType, Target } from './types'
import Square from './components/square'
import Board from './components/Board'
import { copyColorArray, fetchColor, getColorCloseness, locationToString } from './utils'

function App() {

  const [detail, setDetail] = useState<Response>()
  const [colorArray, setColorArray] = useState<ColorArray>()
  const [yLeftColorCollection, setYLeftColorCollection] = useState<ColorArray>()
  const [yRightColorCollection, setYRightColorCollection] = useState<ColorArray>()
  const [xTopColorCollection, setXTopColorCollection] = useState<ColorArray>()
  const [xBottomColorCollection, setXBottomColorCollection] = useState<ColorArray>()
  const [sourceColor, setSourceColor] = useState<SourceColorType>({})
  const [movesLeft, setMovesLeft] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isGameWon, setIsGameWon] = useState<boolean>(false)
  const [isGameLost, setIsGameLost] = useState<boolean>(false)
  const [closeColor, setCloseColor] = useState<ClosestColor>({
    color: [0,0,0],
    position: {x:0,y:0},
    percentage:100
  })



  const initiateColorArray = () => {
    const _colorArray: ColorArray = []
    const defaultColor: Target = [0, 0, 0]

    if(detail) {
      for(let i=0; i<detail?.height; i++) {
        _colorArray.push([])
        for(let j=0; j<detail?.width; j++) {
          _colorArray[i].push(defaultColor)
        }
      }
    }

    setColorArray(_colorArray)
    setXTopColorCollection(copyColorArray(_colorArray))
    setXBottomColorCollection(copyColorArray(_colorArray))
    setYLeftColorCollection(copyColorArray(_colorArray))
    setYRightColorCollection(copyColorArray(_colorArray))
  }

  const onColorChange = (location:LocationType,color?:Target) => {
    const locationString = locationToString(location)
    let _color = color || [0,0,0] as Target

    // on first click set source color to red
    if( detail && detail?.maxMoves - movesLeft === 0) {
      _color = [255,0,0]
    } else if( detail && detail?.maxMoves - movesLeft === 1) {
    // on second click set source color to green
      _color = [0,255,0]
    } else if ( detail && detail?.maxMoves - movesLeft === 2) {
    // on third click set source color to blue  
      _color = [0,0,255]
    }

    setSourceColor({...sourceColor, [locationString]: _color})

    const {x,y,side} = location;

    if(!colorArray || !yLeftColorCollection || !yRightColorCollection || !xTopColorCollection || !xBottomColorCollection) return

    const height = colorArray.length
    const width = colorArray[0].length

    if(x || x === 0) {
      if(side === 'top') {
        const _clonedTopColorCollection = copyColorArray(xTopColorCollection)
        for(let row=height; row>0; row--) {
          console.log('inside top g')
          const red = Math.round(((height + 1 - row) / (height + 1)) * _color[0])
          const green = Math.round( ((height + 1 - row) / (height + 1)) * _color[1])
          const blue = Math.round( ((height + 1 - row) / (height + 1)) * _color[2])
          _clonedTopColorCollection[row-1][x] = [red,green,blue]
          setXTopColorCollection(xTopColorCollection)
        }
        setXTopColorCollection(_clonedTopColorCollection)
      }
      if(side === 'bottom') {
        const _clonedBottomColorCollection = copyColorArray(xBottomColorCollection)
        for(let row=0; row<height; row++) {
          const red = Math.round(((row + 1) / (height + 1)) * _color[0])
          const green = Math.round(((row + 1) / (height + 1)) * _color[1])
          const blue = Math.round(((row + 1) / (height + 1)) * _color[2])
          _clonedBottomColorCollection[row][x] = [red,green,blue]
        }
        setXBottomColorCollection(_clonedBottomColorCollection)
      }
    }

    if(y || y === 0) {
      if(side === 'left') {
        const _clonedLeftColorCollection = copyColorArray(yLeftColorCollection)
        for(let col=0; col < width; col++) {
          const red = Math.round(((width + 1 - col) / (width + 1)) * _color[0])
          const green = Math.round(((width + 1 - col) / (width + 1)) * _color[1])
          const blue = Math.round(((width + 1 - col) / (width + 1)) * _color[2])
          _clonedLeftColorCollection[y][col-1] = [red,green,blue]
        }
        setYLeftColorCollection(_clonedLeftColorCollection)
      }
      if(side === 'right') {
        const _clonedRightColorCollection = copyColorArray(yRightColorCollection)
        for(let col=0; col < width; col++) {
          const red = Math.round(((col + 1) / (width + 1)) * _color[0])
          const green = Math.round(((col + 1) / (width + 1)) * _color[1])
          const blue = Math.round(((col + 1) / (width + 1)) * _color[2])
          _clonedRightColorCollection[y][col] = [red,green,blue]
        }
        setYRightColorCollection(_clonedRightColorCollection)
      }
    }


    setMovesLeft( movesLeft - 1)
  }


  useEffect(() => {
    async function fetchData() {
      const data = await fetchColor()
      setDetail(data)
      setMovesLeft(data?.maxMoves)
      console.log(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    initiateColorArray()
  }, [detail])

  useEffect( () => {
    if(!colorArray || !colorArray[0] || !yLeftColorCollection || !yRightColorCollection || !xTopColorCollection || !xBottomColorCollection) return
    const height = colorArray.length
    const width = colorArray[0].length
    const _clonedColorArray = copyColorArray(colorArray)
    let _clonedClosestColor = {
      color: [0,0,0],
      position: {x:0,y:0},
      percentage:100
    } as ClosestColor

    for(let row=0; row<height; row++) {
      for(let col=0; col<width; col++) {
        const red = Math.round(xTopColorCollection[row][col][0] + xBottomColorCollection[row][col][0] + yLeftColorCollection[row][col][0] + yRightColorCollection[row][col][0])
        const green = Math.round(xTopColorCollection[row][col][1] + xBottomColorCollection[row][col][1] + yLeftColorCollection[row][col][1] + yRightColorCollection[row][col][1])
        const blue = Math.round(xTopColorCollection[row][col][2] + xBottomColorCollection[row][col][2] + yLeftColorCollection[row][col][2] + yRightColorCollection[row][col][2])
        const f = 255/ Math.max(red,green,blue, 255)
        const result = [red * f, green * f, blue * f] as Target
        _clonedColorArray[row][col] = result

        if(detail){
          const closenessPercentage = getColorCloseness(detail?.target, result);
          console.log('%cclosenessPercentage', `background-color: rgb(${result[0]},${result[1]},${result[2]});padding:10px; color:white;`, closenessPercentage, `{x:${col+1},y:${col+1}}` )
          if(closenessPercentage < _clonedClosestColor.percentage)
            _clonedClosestColor = {color: result, percentage: closenessPercentage, position: {x: col, y: row}}
        }
      }
    }

    setColorArray(_clonedColorArray)
    setCloseColor(_clonedClosestColor)
  } ,[xBottomColorCollection,xTopColorCollection,yLeftColorCollection,yRightColorCollection])

  return (
    <div className="App">
      <p>User Id: {detail?.userId}</p>
      <p>MovesLeft: {movesLeft}</p>
      <p>Target Color: {detail && <Square color={detail?.target} />} </p>
      <p>Closest Color: {detail && <Square color={closeColor.color} />} <span>  Δ= {closeColor.percentage}</span> </p>

      <div>
        {(colorArray && colorArray.length > 0) &&
         <Board sourceColor={sourceColor} closeColor={closeColor} colorArray={colorArray} sourceClickable={ detail && detail?.maxMoves -  movesLeft <3}  onColorChange={onColorChange}/> }
      </div>
    </div>
  )
}

export default App
