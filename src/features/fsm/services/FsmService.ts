import {IFsmBuilder} from "./types";

export class FsmService {
    public static validateAddValues(fsmBuilder: IFsmBuilder): IFsmBuilder {
        let updatedFsmBuilder = {...fsmBuilder};
        updatedFsmBuilder.errors = [];

        if (updatedFsmBuilder.values.length === 0) {
            updatedFsmBuilder.errors.push('At least one value input is required');
        }

        if (updatedFsmBuilder.values.find(v => v.value === '')) {
            updatedFsmBuilder.errors.push('Empty value found');
        }

        if (updatedFsmBuilder.errors.length === 0) {
            updatedFsmBuilder.stage++;
        }

        return updatedFsmBuilder;
    }

    public static validateAddStates(fsmBuilder: IFsmBuilder): IFsmBuilder {
        let updatedFsmBuilder = {...fsmBuilder};
        updatedFsmBuilder.errors = [];

        if (updatedFsmBuilder.states.length === 0) {
            updatedFsmBuilder.errors.push('At least one state input is required');
        }

        if (updatedFsmBuilder.states.find(s => s.name === '')) {
            updatedFsmBuilder.errors.push('Empty state name found');
        }

        if (updatedFsmBuilder.states.find(s => s.output.value === '')) {
            updatedFsmBuilder.errors.push('Empty state value found');
        }

        if (updatedFsmBuilder.errors.length === 0) {
            updatedFsmBuilder.stage++;
        }

        return updatedFsmBuilder;
    }

    public static validateAddTransitions(fsmBuilder: IFsmBuilder): IFsmBuilder {
        let updatedFsmBuilder = {...fsmBuilder};
        updatedFsmBuilder.errors = [];

        if (updatedFsmBuilder.transitions.length === 0) {
            updatedFsmBuilder.errors.push('At least one transition is required');
        }

        if (updatedFsmBuilder.transitions.find(t => t.fromFsmState.name === '')) {
            updatedFsmBuilder.errors.push('Transition from state is required');
        }

        if (updatedFsmBuilder.transitions.find(t => t.toFsmState.name === '')) {
            updatedFsmBuilder.errors.push('Transition to state is required');
        }

        if (updatedFsmBuilder.transitions.find(t => t.input.value === '')) {
            updatedFsmBuilder.errors.push('Transition input is required');
        }

        if (updatedFsmBuilder.errors.length === 0) {
            updatedFsmBuilder.stage++;
        }

        return updatedFsmBuilder;
    }


    public static validateAddCurrentState(fsmBuilder: IFsmBuilder): IFsmBuilder {
        let updatedFsmBuilder = {...fsmBuilder};
        updatedFsmBuilder.errors = [];

        if (updatedFsmBuilder.currentFsmState === null) {
            updatedFsmBuilder.errors.push('At least one state is required');
        }

        if (updatedFsmBuilder.errors.length === 0) {
            updatedFsmBuilder.stage++;
        }

        return updatedFsmBuilder;
    }

    public static processInput(fsmBuilder: IFsmBuilder): IFsmBuilder {
        let updatedFsmBuilder = {...fsmBuilder};
        updatedFsmBuilder.fsmOutputs = [];
        updatedFsmBuilder.errors = [];

        if (updatedFsmBuilder.fsmInputs.length === 0) {
            updatedFsmBuilder.errors.push('At least one user input is required');
            return updatedFsmBuilder;
        }

        updatedFsmBuilder.fsmInputs.map((input) => {
            const transition = fsmBuilder.transitions.find(
                t => t.input.value === input.value
                    && t.fromFsmState.name === updatedFsmBuilder.currentFsmState?.name
            );

            const toFsmState = transition ? transition.toFsmState : null;
            if (toFsmState === null) {
                updatedFsmBuilder = {...updatedFsmBuilder, errors: ['No transition found']};
                updatedFsmBuilder.fsmOutputs = [];
                return updatedFsmBuilder;
            }

            updatedFsmBuilder = {...updatedFsmBuilder, fsmOutputs: [toFsmState.output]}
            updatedFsmBuilder = {...updatedFsmBuilder, currentFsmState: toFsmState}
            return updatedFsmBuilder;
        });

        return updatedFsmBuilder;
    }

}

