import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks"
import {addTransitions, resetFsm, selectFsmBuilder} from "../redux/fsmBuilderSlice";

const AddTransitions = () => {

    const currentFsmBuilder = useAppSelector(selectFsmBuilder);
    const dispatch = useAppDispatch();

    const [valueInputs] = useState(currentFsmBuilder.values);
    const [stateInputs] = useState(currentFsmBuilder.states);
    const [transitionInputs, setTransitionInputs] = useState(currentFsmBuilder.transitions);

    const handleUpdateTransitionFromState = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        setTransitionInputs((inputs) => {
            const fromFsmState = stateInputs.find(t => t.name === e.target.value);
            const updatedTransitionInputs = [...inputs];
            updatedTransitionInputs[index] = {...updatedTransitionInputs[index], fromFsmState: fromFsmState!};
            return updatedTransitionInputs;
        });
    }

    const handleUpdateTransitionInput = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        setTransitionInputs((inputs) => {
            const transitionInput = valueInputs.find(t => t.value === e.target.value);
            const updatedTransitionInputs = [...inputs];
            updatedTransitionInputs[index] = {...updatedTransitionInputs[index], input: transitionInput!!};
            return updatedTransitionInputs;
        });
    }

    const handleUpdateTransitionToState = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        setTransitionInputs((inputs) => {
            const toFsmState = stateInputs.find(t => t.name === e.target.value);
            const updatedTransitionInputs = [...inputs];
            updatedTransitionInputs[index] = {...updatedTransitionInputs[index], toFsmState: toFsmState!!};
            return updatedTransitionInputs;
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addTransitions({...currentFsmBuilder, transitions: transitionInputs}));
    }

    return (
        <div>
            <h2>Add Transitions</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input data-testid={"add-button"} type="button" onClick={() => setTransitionInputs((inputs) => [...inputs, {
                        fromFsmState: {
                            name: '', output: {
                                value: ''
                            }
                        },
                        input: {
                            value: '',
                        },
                        toFsmState: {
                            name: '',
                            output: {
                                value: ''
                            }
                        }
                    }])} value={"+"} />
                </div>

                {transitionInputs.map((input, index) => (
                    <div key={index}>
                        <select data-testid={"transition-from-state"} value={input.fromFsmState.name} onChange={(e) => handleUpdateTransitionFromState(e, index)}>
                            <option value="">--From State--</option>
                            {stateInputs.map((value, idx) => (
                                <option key={idx} value={value.name}>
                                    {value.name}
                                </option>
                            ))}
                        </select>

                        <select data-testid={"transition-value-input"} value={input.input.value} onChange={(e) => handleUpdateTransitionInput(e, index)}>
                            <option value="">--Input--</option>
                            {valueInputs.map((value, idx) => (
                                <option key={idx} value={value.value}>
                                    {value.value}
                                </option>
                            ))}
                        </select>

                        <select data-testid={"transition-to-state"} value={input.toFsmState.name} onChange={(e) => handleUpdateTransitionToState(e, index)}>
                            <option value="">--To State--</option>
                            {stateInputs.map((value, idx) => (
                                <option key={idx} value={value.name}>
                                    {value.name}
                                </option>
                            ))}
                        </select>

                        <input data-testid={"delete-button"} type="button" onClick={() => setTransitionInputs((inputs) => inputs.filter((_, i) => i !== index))} value={"x"}/>
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

export default AddTransitions;
