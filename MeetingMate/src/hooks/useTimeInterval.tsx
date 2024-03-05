import { useEffect, useState } from 'react';

export const useTimeInterval = (callback,interval) => {
    useEffect(() => {
        const intervalId = setInterval(callback, interval); 

        return () => clearInterval(intervalId); 
      }, [callback]); 


};