import {createContext} from 'react'; 
interface StepperContextProps{
    spaceinfo : any;
    setSpaceInfo : any;
    spaceImages: any; 
    setSpaceImages: any; 
    spacePrice : any; 
    setSpacePrice : any;
}
export const StepperContext = createContext<StepperContextProps | null> (null); 