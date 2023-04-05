import {IFsmBuilder} from "../../../../features/fsm/services/types";
import fsmBuilderReducer, {
    addStates,
    addValues,
    addTransitions,
    addCurrentState,
    processInput
} from "../../../../features/fsm/redux/fsmBuilderSlice";

describe('FsmBuilderReducer test', () => {
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

    const fullFsmBuilder: IFsmBuilder = {
        values: [{value: '0'}, {value: '1'}],
        states: [{name: 's0', output: {value :'0'}}, {name: 's1', output: {value :'1'}}],
        transitions: [{fromFsmState: {name: 's0', output: {value :'0'}}, toFsmState: {name: 's1', output: {value :'1'}}, input: {value: '1'}}],
        currentFsmState: {name: 's0', output: {value :'0'}},
        fsmInputs: [{value: '1'}],
        fsmOutputs: [],
        errors: [],
        stage: 0,
    };

    it('should handle validate add values', () => {
        const actual = fsmBuilderReducer(emptyFsmBuilder, addValues(fullFsmBuilder));
        expect(actual.values).toEqual(fullFsmBuilder.values);
        expect(actual.stage).toEqual(++fullFsmBuilder.stage);
    });

    it('should handle validate add states', () => {
        const actual = fsmBuilderReducer(emptyFsmBuilder, addStates(fullFsmBuilder));
        expect(actual.states).toEqual(fullFsmBuilder.states);
        expect(actual.stage).toEqual(++fullFsmBuilder.stage);
    });

    it('should handle validate add transitions', () => {
        const actual = fsmBuilderReducer(emptyFsmBuilder, addTransitions(fullFsmBuilder));
        expect(actual.transitions).toEqual(fullFsmBuilder.transitions);
        expect(actual.stage).toEqual(++fullFsmBuilder.stage);
    });

    it('should handle validate add current state', () => {
        const actual = fsmBuilderReducer(emptyFsmBuilder, addCurrentState(fullFsmBuilder));
        expect(actual.currentFsmState).toEqual(fullFsmBuilder.currentFsmState);
        expect(actual.stage).toEqual(++fullFsmBuilder.stage);
    });

    it('should handle successful result', () => {
        const actual = fsmBuilderReducer(fullFsmBuilder, processInput(fullFsmBuilder));
        expect(actual.currentFsmState).toEqual({name: 's1', output: {value :'1'}});
        expect(actual.fsmOutputs).toEqual([{value :'1'}]);
        expect(actual.stage).toEqual(fullFsmBuilder.stage);
    });
});
