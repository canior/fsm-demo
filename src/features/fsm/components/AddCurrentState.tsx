import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks"
import {addCurrentState, resetFsm, selectFsmBuilder} from "../redux/fsmBuilderSlice";

const AddCurrentState = () => {

    const currentFsmBuilder = useAppSelector(selectFsmBuilder);
    const dispatch = useAppDispatch();
    const [stateInputs] = useState(currentFsmBuilder.states);
    const [currentStateInput, setCurrentStateInput] = useState(currentFsmBuilder.currentFsmState);

    const handleUpdateCurrentState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStateInput((input) => {
            const currentFsmState = stateInputs.find(t => t.name === e.target.value)!;
            return { ...input, ...currentFsmState };
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCurrentState({...currentFsmBuilder, currentFsmState: currentStateInput}));
    }

    return (
        <div>
            <h2>Add Current State</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <select data-testid={"current-state-input"} placeholder="Current State" value={currentStateInput?.name ?? ''} onChange={(e) => handleUpdateCurrentState(e)}>
                    <option value="">--Select Value--</option>
                    {stateInputs.map((value, idx) => (
                        <option key={idx} value={value.name}>
                            {value.name}
                        </option>
                    ))}
                </select>

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

export default AddCurrentState;
