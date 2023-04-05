import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks"
import {processInput, selectFsmBuilder} from "../redux/fsmBuilderSlice";

const AddInputs = () => {

    const currentFsmBuilder = useAppSelector(selectFsmBuilder);
    const dispatch = useAppDispatch();

    const [fsmInputs, setFsmInputs] = useState(currentFsmBuilder.fsmInputs);
    const [valueInputs] = useState(currentFsmBuilder.values);

    const handleUpdateFsmInput = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        setFsmInputs((inputs) => {
            const updatedInputs = [...inputs];
            updatedInputs[index] = {...updatedInputs[index], value: e.target.value};
            return updatedInputs;
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(processInput({...currentFsmBuilder, fsmInputs: fsmInputs}));
    }

    return (
        <div>
            <h2>Add Inputs</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input data-testid={"add-button"} type="button" onClick={() => setFsmInputs([...fsmInputs, {value: ''}])} value={"+"} />
                </div>
                {fsmInputs.map((input, index) => (
                    <div key={index}>
                        <select data-testid={"input-input"}  placeholder="Current State" value={input.value} onChange={(e) => handleUpdateFsmInput(e, index)}>
                            <option value="">--Select Value--</option>
                            {valueInputs.map((value, idx) => (
                                <option key={idx} value={value.value}>
                                    {value.value}
                                </option>
                            ))}
                        </select>
                        <input data-testid={"delete-button"} type="button" onClick={() => setFsmInputs((inputs) => inputs.filter((_, i) => i !== index))} value={"x"} />
                    </div>
                ))}

                <div className="btn-array">
                    <p>
                        <input
                            data-testid={"submit-button"}
                            type="submit"
                            value={'Submit'}
                        />
                    </p>
                </div>
            </form>
        </div>
    );
}

export default AddInputs;
