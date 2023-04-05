import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks"
import {addStates, resetFsm, selectFsmBuilder} from "../redux/fsmBuilderSlice";

const AddStates = () => {

    const currentFsmBuilder = useAppSelector(selectFsmBuilder);
    const dispatch = useAppDispatch();

    const [valueInputs] = useState(currentFsmBuilder.values);
    const [stateInputs, setStateInputs] = useState(currentFsmBuilder.states);

    const handleUpdateStateName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        setStateInputs((inputs) => {
            const updatedInputs = [...inputs];
            updatedInputs[index] = { ...updatedInputs[index], name: e.target.value };
            return updatedInputs;
        });
    }

    const handleUpdateStateOutput = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        e.preventDefault();
        setStateInputs((inputs) => {
            const updatedInputs = [...inputs];
            updatedInputs[index] = { ...updatedInputs[index], output: {value: e.target.value} };
            return updatedInputs;
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addStates({...currentFsmBuilder, states: stateInputs}));
    }

    return (
        <div>
            <h2>Add States</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input data-testid={"add-button"} type="button" onClick={() => setStateInputs([...stateInputs, {name: '', output: {value: ''}}])} value={"+"} />
                </div>
                {stateInputs.map((input, index) => (
                    <div key={index}>
                        <input data-testid={"state-name-input"} type="text" placeholder="State Name" value={input.name} onChange={(e) => handleUpdateStateName(e, index)}/>
                        <select data-testid={"state-value-input"} value={input.output.value} onChange={(e) => handleUpdateStateOutput(e, index)}>
                            <option value="">--Value--</option>
                            {valueInputs.map((value, idx) => (
                                <option key={idx} value={value.value}>
                                    {value.value}
                                </option>
                            ))}
                        </select>
                        <input data-testid={"delete-button"} type="button" onClick={() => setStateInputs((inputs) => inputs.filter((_, i) => i !== index))} value={"x"} />
                    </div>
                ))}

                <div className="btn-array">
                    <p>
                        <input
                            type="button"
                            value={`Reset`}
                            onClick={() => dispatch(resetFsm())}
                        />
                    </p>
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

export default AddStates;
