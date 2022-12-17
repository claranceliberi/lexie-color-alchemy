import { ColorArray, LocationType, Response } from "./types"

 export const fetchColor = async () => {
    const response = await fetch('http://localhost:9876/init')
    const data = await response.json() as Response
    return data
  }

export const locationToString = ({x,y,side}: LocationType) => {
    if(x || x === 0){
        return `x-${side}-${x}`
    }

    return `y-${side}-${y}`
  }

export const copyColorArray = (colorArray: ColorArray) => JSON.parse(JSON.stringify(colorArray)) as ColorArray