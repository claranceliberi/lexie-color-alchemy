import { ColorArray, LocationType, Response, Target } from "./types"

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

export const copyColorArray = <T>(colorArray: T) => JSON.parse(JSON.stringify(colorArray)) as T

export const getColorCloseness = (targetColor: Target, testColor: Target) => {
  const closeness = (1/255) * (1/Math.sqrt(3)) * Math.sqrt(Math.pow(targetColor[0] - testColor[0],2) + Math.pow(targetColor[1] - testColor[1],2) + Math.pow(targetColor[2] - testColor[2],2))
  return Math.round(closeness * 100)
}