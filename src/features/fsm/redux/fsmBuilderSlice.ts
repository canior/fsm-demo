import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import {IFsmBuilder} from "../services/types";
import {FsmService} from "../services/FsmService";

const emptyFsmBuilder = {
    values: [],
    states: [],
    transitions: [],
    currentFsmState: null,
    fsmInputs: [],
    fsmOutputs: [],
    errors: [],
    stage: 0,
};

const initialState: IFsmBuilder = {...emptyFsmBuilder};

const fsmBuilderSlice = createSlice({
    name: "fsmBuilder",
    initialState,

    reducers: {
        addValues: (state, action: PayloadAction<IFsmBuilder>) => {
            return {...state, ...FsmService.validateAddValues(action.payload)}
        },

        addStates: (state, action: PayloadAction<IFsmBuilder>) => {
            return {...state, ...FsmService.validateAddStates(action.payload)}
        },

        addTransitions: (state, action: PayloadAction<IFsmBuilder>) => {
            return {...state, ...FsmService.validateAddTransitions(action.payload)}
        },

        addCurrentState: (state, action: PayloadAction<IFsmBuilder>) => {
            return {...state, ...FsmService.validateAddCurrentState(action.payload)}
        },

        resetFsm: (state) => {
            return {...state, ...emptyFsmBuilder};
        },

        processInput: (state, action: PayloadAction<IFsmBuilder>) => {
            return {...state, ...FsmService.processInput(action.payload)}
        },
    },
});

export const selectFsmBuilder = (state: RootState) => state.fsmBuilder;
export const {addValues, addStates, addTransitions, addCurrentState, processInput, resetFsm} = fsmBuilderSlice.actions;
export default fsmBuilderSlice.reducer;
