import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    const [formValues, setForm] = useState(initialState);
    const handleInputChange = ({target}) => {
        setForm({
            ...formValues,
            [target.name] : target.value
        });
    };

    const reset = () => setForm(initialState);

    return [ formValues, handleInputChange, reset ];
}