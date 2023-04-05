import {fireEvent, render, screen} from '@testing-library/react';
import {store} from "../../../../app/store";
import {Provider} from "react-redux";
import React from "react";
import AddCurrentState from "../../../../features/fsm/components/AddCurrentState";

describe('AddCurrentState Component Tests', () => {
    it('should display normally', () => {
        render(
            <Provider store={store}>
                <AddCurrentState />
            </Provider>);

        expect(screen.queryByTestId('add-button')).toBeDefined();
        expect(screen.queryByTestId('value-input')).toBeNull();
        expect(screen.queryByTestId('delete-button')).toBeNull();
    });


    it('should submit successfully with error', () => {
        render(
            <Provider store={store}>
                <AddCurrentState />
            </Provider>);

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(store.getState().fsmBuilder.currentFsmState).toBeNull();
        expect(store.getState().fsmBuilder.errors).toHaveLength(1);
    });
});
