import { useState } from 'react';
import { useMainStore } from '../MainStoreContext';

export default function ExampleComponent() {

    const mainStore = useMainStore();

    const [textToggle, toggleText] = useState(false);
    const [textToDisplay, setText] = useState('default text');

    const updateText = () => {
        toggleText(!textToggle);

        if (textToggle) {
            mainStore.exampleSetterFunction('default text');
        } else {
            mainStore.exampleSetterFunction('toggled text');
        }

        setText(mainStore.exampleVariable);

    };
		
	return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-white'>Displaying text from mainStore: <span className='text-green-700 font-bold'>{textToDisplay}</span></h1>
            <button 
            onClick={() => updateText()}
            className='text-white bg-red-700 p-2'
            >
                Change Text
            </button>
        </div>
    );
}