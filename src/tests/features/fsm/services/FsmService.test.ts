import {FsmService} from "../../../../features/fsm/services/FsmService";
import {IFsmBuilder} from "../../../../features/fsm/services/types";


describe('FsmService test', () => {
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

    it('test validate add values with errors', () => {
        expect(FsmService.validateAddValues(emptyFsmBuilder).errors)
            .toStrictEqual(['At least one value input is required']);

        expect(FsmService.validateAddValues({...emptyFsmBuilder, ...{values: [{value: ''}]}}).errors)
            .toStrictEqual(['Empty value found']);
    });

    it('test validate add values successfully', () => {
        const actual = FsmService.validateAddValues({...emptyFsmBuilder, ...{values: [{value: '0'}]}});
        expect(actual.errors).toStrictEqual([]);
        expect(actual.stage).toStrictEqual(++emptyFsmBuilder.stage);
    });

    it('test validate add states with errors', () => {
        expect(FsmService.validateAddStates(emptyFsmBuilder).errors)
            .toStrictEqual(['At least one state input is required']);

        expect(FsmService.validateAddStates({
            ...emptyFsmBuilder, ...{
                states: [{
                    name: '',
                    output: {value: '0'}
                }]
            }
        }).errors)
            .toStrictEqual(['Empty state name found']);

        expect(FsmService.validateAddStates({
            ...emptyFsmBuilder, ...{
                states: [{
                    name: 's0',
                    output: {value: ''}
                }]
            }
        }).errors)
            .toStrictEqual(['Empty state value found']);
    });

    it('test validate add states successfully', () => {
        const actual = FsmService.validateAddStates({
            ...emptyFsmBuilder, ...{
                states: [{
                    name: 's0',
                    output: {value: '0'}
                }]
            }
        });
        expect(actual.errors).toStrictEqual([]);
        expect(actual.stage).toStrictEqual(++emptyFsmBuilder.stage);
    });

    it('test validate add transitions with errors', () => {
        expect(FsmService.validateAddTransitions(emptyFsmBuilder).errors)
            .toStrictEqual(['At least one transition is required']);

        expect(FsmService.validateAddTransitions({
            ...emptyFsmBuilder, ...{
                transitions: [{
                    fromFsmState: {
                        name: '',
                        output: {value: '0'}
                    }, toFsmState: {name: 's1', output: {value: '1'}}, input: {value: '1'}
                }]
            }
        }).errors)
            .toStrictEqual(['Transition from state is required']);

        expect(FsmService.validateAddTransitions({
            ...emptyFsmBuilder, ...{
                transitions: [{
                    fromFsmState: {
                        name: 's0',
                        output: {value: '0'}
                    }, toFsmState: {name: '', output: {value: '1'}}, input: {value: '1'}
                }]
            }
        }).errors)
            .toStrictEqual(['Transition to state is required']);

        expect(FsmService.validateAddTransitions({
            ...emptyFsmBuilder, ...{
                transitions: [{
                    fromFsmState: {
                        name: 's0',
                        output: {value: '0'}
                    }, toFsmState: {name: 's1', output: {value: '1'}}, input: {value: ''}
                }]
            }
        }).errors)
            .toStrictEqual(['Transition input is required']);
    });

    it('test validate add transitions successfully', () => {
        const actual = FsmService.validateAddTransitions({
            ...emptyFsmBuilder, ...{
                transitions: [{
                    fromFsmState: {
                        name: 's0',
                        output: {value: '0'}
                    }, toFsmState: {name: 's1', output: {value: '1'}}, input: {value: '1'}
                }]
            }
        });
        expect(actual.errors).toStrictEqual([]);
        expect(actual.stage).toStrictEqual(++emptyFsmBuilder.stage);
    });

    it('test process input with errors', () => {
        expect(FsmService.processInput(emptyFsmBuilder).errors)
            .toStrictEqual(['At least one user input is required']);

        expect(FsmService.processInput({
            values: [{value: '0'}, {value: '1'}],
            states: [{name: 's0', output: {value: '0'}}, {name: 's1', output: {value: '1'}}],
            transitions: [{
                fromFsmState: {name: 's0', output: {value: '0'}},
                toFsmState: {name: 's1', output: {value: '1'}},
                input: {value: '1'}
            }],
            currentFsmState: {name: 's0', output: {value: '0'}},
            fsmInputs: [{value: '0'}],
            fsmOutputs: [],
            errors: [],
            stage: 0,
        }).errors).toStrictEqual(['No transition found']);
    });

    it('test process input successfully', () => {
        const fullFsmBuilder: IFsmBuilder = {
            values: [{value: '0'}, {value: '1'}],
            states: [{name: 's0', output: {value: '0'}}, {name: 's1', output: {value: '1'}}],
            transitions: [{
                fromFsmState: {name: 's0', output: {value: '0'}},
                toFsmState: {name: 's1', output: {value: '1'}},
                input: {value: '1'}
            }],
            currentFsmState: {name: 's0', output: {value: '0'}},
            fsmInputs: [{value: '1'}],
            fsmOutputs: [],
            errors: [],
            stage: 0,
        };

        const actual = FsmService.processInput(fullFsmBuilder);
        expect(actual.errors).toStrictEqual([]);
        expect(actual.currentFsmState).toEqual({name: 's1', output: {value: '1'}});
        expect(actual.fsmOutputs).toEqual([{value: '1'}]);
        expect(actual.stage).toEqual(fullFsmBuilder.stage);
    });

    it('test modThree(1101) => 1', () => {
        const fullFsmBuilder: IFsmBuilder = {
            values: [{value: '0'}, {value: '1'}],
            states: [{name: 's0', output: {value: '0'}}, {name: 's1', output: {value: '1'}}, {
                name: 's2',
                output: {value: '2'}
            }],
            transitions: [
                {
                    fromFsmState: {name: 's0', output: {value: '0'}},
                    toFsmState: {name: 's0', output: {value: '0'}},
                    input: {value: '0'}
                },
                {
                    fromFsmState: {name: 's0', output: {value: '0'}},
                    toFsmState: {name: 's1', output: {value: '1'}},
                    input: {value: '1'}
                },

                {
                    fromFsmState: {name: 's1', output: {value: '1'}},
                    toFsmState: {name: 's2', output: {value: '2'}},
                    input: {value: '0'}
                },
                {
                    fromFsmState: {name: 's1', output: {value: '1'}},
                    toFsmState: {name: 's0', output: {value: '0'}},
                    input: {value: '1'}
                },

                {
                    fromFsmState: {name: 's2', output: {value: '2'}},
                    toFsmState: {name: 's2', output: {value: '2'}},
                    input: {value: '1'}
                },
                {
                    fromFsmState: {name: 's2', output: {value: '2'}},
                    toFsmState: {name: 's1', output: {value: '1'}},
                    input: {value: '0'}
                },
            ],
            currentFsmState: {name: 's0', output: {value: '0'}},
            fsmInputs: [
                {value: '1'},
                {value: '1'},
                {value: '0'},
                {value: '1'}
            ],
            fsmOutputs: [],
            errors: [],
            stage: 0,
        };

        const actual = FsmService.processInput(fullFsmBuilder);
        expect(actual.fsmOutputs).toEqual([{value: '1'}]);
    });

    it('test modThree(1110) => 2', () => {
        const fullFsmBuilder: IFsmBuilder = {
            values: [{value: '0'}, {value: '1'}],
            states: [{name: 's0', output: {value: '0'}}, {name: 's1', output: {value: '1'}}, {
                name: 's2',
                output: {value: '2'}
            }],
            transitions: [
                {
                    fromFsmState: {name: 's0', output: {value: '0'}},
                    toFsmState: {name: 's0', output: {value: '0'}},
                    input: {value: '0'}
                },
                {
                    fromFsmState: {name: 's0', output: {value: '0'}},
                    toFsmState: {name: 's1', output: {value: '1'}},
                    input: {value: '1'}
                },

                {
                    fromFsmState: {name: 's1', output: {value: '1'}},
                    toFsmState: {name: 's2', output: {value: '2'}},
                    input: {value: '0'}
                },
                {
                    fromFsmState: {name: 's1', output: {value: '1'}},
                    toFsmState: {name: 's0', output: {value: '0'}},
                    input: {value: '1'}
                },

                {
                    fromFsmState: {name: 's2', output: {value: '2'}},
                    toFsmState: {name: 's2', output: {value: '2'}},
                    input: {value: '1'}
                },
                {
                    fromFsmState: {name: 's2', output: {value: '2'}},
                    toFsmState: {name: 's1', output: {value: '1'}},
                    input: {value: '0'}
                },
            ],
            currentFsmState: {name: 's0', output: {value: '0'}},
            fsmInputs: [
                {value: '1'},
                {value: '1'},
                {value: '1'},
                {value: '0'}
            ],
            fsmOutputs: [],
            errors: [],
            stage: 0,
        };

        const actual = FsmService.processInput(fullFsmBuilder);
        expect(actual.fsmOutputs).toEqual([{value: '2'}]);
    });

    it('test modThree(1111) => 0', () => {
        const fullFsmBuilder: IFsmBuilder = {
            values: [{value: '0'}, {value: '1'}],
            states: [{name: 's0', output: {value: '0'}}, {name: 's1', output: {value: '1'}}, {
                name: 's2',
                output: {value: '2'}
            }],
            transitions: [
                {
                    fromFsmState: {name: 's0', output: {value: '0'}},
                    toFsmState: {name: 's0', output: {value: '0'}},
                    input: {value: '0'}
                },
                {
                    fromFsmState: {name: 's0', output: {value: '0'}},
                    toFsmState: {name: 's1', output: {value: '1'}},
                    input: {value: '1'}
                },

                {
                    fromFsmState: {name: 's1', output: {value: '1'}},
                    toFsmState: {name: 's2', output: {value: '2'}},
                    input: {value: '0'}
                },
                {
                    fromFsmState: {name: 's1', output: {value: '1'}},
                    toFsmState: {name: 's0', output: {value: '0'}},
                    input: {value: '1'}
                },

                {
                    fromFsmState: {name: 's2', output: {value: '2'}},
                    toFsmState: {name: 's2', output: {value: '2'}},
                    input: {value: '1'}
                },
                {
                    fromFsmState: {name: 's2', output: {value: '2'}},
                    toFsmState: {name: 's1', output: {value: '1'}},
                    input: {value: '0'}
                },
            ],
            currentFsmState: {name: 's0', output: {value: '0'}},
            fsmInputs: [
                {value: '1'},
                {value: '1'},
                {value: '1'},
                {value: '1'}
            ],
            fsmOutputs: [],
            errors: [],
            stage: 0,
        };

        const actual = FsmService.processInput(fullFsmBuilder);
        expect(actual.fsmOutputs).toEqual([{value: '0'}]);
    });
});
