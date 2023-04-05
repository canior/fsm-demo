export interface IFsmValue {
    value: string
}

export interface IFsmState {
    name: string,
    output: IFsmValue
}

export interface IFsmTransition {
    fromFsmState: IFsmState,
    input: IFsmValue,
    toFsmState: IFsmState
}

export interface IFsmBuilder {
    values: IFsmValue[],
    states: IFsmState[],
    transitions: IFsmTransition[],
    currentFsmState: IFsmState|null,
    fsmInputs: IFsmValue[],
    fsmOutputs: IFsmValue[],
    stage: number,
    errors: string[],
}

