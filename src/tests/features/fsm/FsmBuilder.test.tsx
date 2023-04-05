import {getByText, render} from '@testing-library/react';
import {store} from "../../../app/store";
import {Provider} from "react-redux";
import React from "react";
import FsmBuilder from "../../../features/fsm/FsmBuilder";

describe('FsmBuilder Component Tests', () => {
    it('should display normally', () => {
        const { getByText } = render(
            <Provider store={store}>
                <FsmBuilder />
            </Provider>);

        expect(getByText(/Finite State Machine Builder/i)).toBeInTheDocument();
    });
});
