import {fireEvent, render, screen} from '@testing-library/react';
import {store} from "../../../../app/store";
import {Provider} from "react-redux";
import React from "react";
import AddTransitions from "../../../../features/fsm/components/AddTransitions";

describe('AddTransitions Component Tests', () => {
    it('should display normally', () => {
        render(
            <Provider store={store}>
                <AddTransitions/>
            </Provider>);

        expect(screen.queryByTestId('add-button')).toBeDefined();
        expect(screen.queryByTestId('transition-from-state')).toBeNull();
        expect(screen.queryByTestId('transition-value-input')).toBeNull();
        expect(screen.queryByTestId('transition-to-state')).toBeNull();
        expect(screen.queryByTestId('delete-button')).toBeNull();
    });

    it('should add item when click add', () => {
        render(
            <Provider store={store}>
                <AddTransitions/>
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        expect(screen.queryAllByTestId('transition-from-state')).toHaveLength(1);
        expect(screen.queryAllByTestId('transition-value-input')).toHaveLength(1);
        expect(screen.queryAllByTestId('transition-to-state')).toHaveLength(1);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(1);
    });

    it('should delete item when click delete', () => {
        render(
            <Provider store={store}>
                <AddTransitions/>
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(screen.queryAllByTestId('transition-from-state')).toHaveLength(0);
        expect(screen.queryAllByTestId('transition-value-input')).toHaveLength(0);
        expect(screen.queryAllByTestId('transition-to-state')).toHaveLength(0);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(0);
    });

    it('should submit successfully with errors', () => {
        render(
            <Provider store={store}>
                <AddTransitions/>
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(addButton);
        fireEvent.click(submitButton);

        expect(store.getState().fsmBuilder.transitions).toStrictEqual([
            {
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
            }
        ]);
        expect(store.getState().fsmBuilder.errors).toHaveLength(3);
    });
});
