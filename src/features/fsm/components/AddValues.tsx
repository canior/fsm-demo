import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks"
import {addValues, selectFsmBuilder} from "../redux/fsmBuilderSlice";

const AddValues = () => {

    const currentFsmBuilder = useAppSelector(selectFsmBuilder);
    const dispatch = useAppDispatch();

    const [valueInputs, setValueInputs] = useState(currentFsmBuilder.values);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addValues({...currentFsmBuilder, values: valueInputs}));
    }

    return (
        <div>
            <h2>Add Values</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input data-testid={"add-button"} type="button" onClick={() => setValueInputs([...valueInputs, {value: ''}])} value={"+"}/>
                </div>
                {valueInputs.map((input, index) => (
                    <div key={index}>
                        <input data-testid={"value-input"} type="text" placeholder="Value" value={input.value} onChange={(e) => setValueInputs((inputs) => inputs.map((item, i) => i === index ? { value: e.target.value } : item))} />
                        <input data-testid={"delete-button"} type="button" onClick={() => setValueInputs((inputs) => inputs.filter((_, i) => i !== index))} value={'x'} />
                    </div>
                ))}

                <div className="btn-array">
                    <p>
                        <input
                            data-testid={"submit-button"}
                            type="submit"
                            value={'Next'}
                        />
                    </p>
                </div>
            </form>
        </div>
    );
}

export default AddValues;
