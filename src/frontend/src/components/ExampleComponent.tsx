import { useEffect, useState } from 'react';
import { useMainStore } from '../MainStoreContext';

export default function ExampleComponent() {

    const mainStore = useMainStore();

    const [textToggle, toggleText] = useState(false);
    const [textToDisplay, setTextToDisplay] = useState('default text');

    useEffect(() => {
        if (textToggle) {
            mainStore.exampleSetterFunction('default text');
        } else {
            mainStore.exampleSetterFunction('toggled text');
        }

        setTextToDisplay(mainStore.exampleVariable);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textToggle]);
		
	return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-white'>Displaying text from mainStore: <span className='text-green-700 font-bold'>{textToDisplay}</span></h1>
            
            <button 
            onClick={() => toggleText(!textToggle)}
            className='text-white bg-red-700 p-2'
            >
                Change Text
            </button>
        </div>
    );
}