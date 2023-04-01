import { createContext, useContext, useState } from 'react';


const Context = createContext<any>(null);

export const MainContextProvider = ({ children }: any) => {
    const [count, setCount] = useState<number>(0);

    return <Context.Provider value={{ count, setCount }}>{children}</Context.Provider>;
};

export const useNotificationContext = () =>
    useContext<{
        count: number;
        setCount: (value: ((state: number) => number) | number) => void;
    }>(Context);
