import { checkMotionReduce } from "./checkMotionReduce";

export const motionReducerSwitch = <T,>(valueWithoutMotionReduce: T | number, valueWithMotionReduce?: T | number): T | number => {
    return !checkMotionReduce() ? valueWithoutMotionReduce : (valueWithMotionReduce ? valueWithMotionReduce : 0);
};