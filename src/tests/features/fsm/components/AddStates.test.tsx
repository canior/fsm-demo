import {fireEvent, render, screen} from '@testing-library/react';
import {store} from "../../../../app/store";
import {Provider} from "react-redux";
import React from "react";
import AddStates from "../../../../features/fsm/components/AddStates";

describe('AddStates Component Tests', () => {
    it('should display normally', () => {
        render(
            <Provider store={store}>
                <AddStates />
            </Provider>);

        expect(screen.queryByTestId('add-button')).toBeDefined();
        expect(screen.queryByTestId('state-value-input')).toBeNull();
        expect(screen.queryByTestId('delete-button')).toBeNull();
    });

    it('should add item when click add', () => {
        render(
            <Provider store={store}>
                <AddStates />
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        expect(screen.queryAllByTestId('state-name-input')).toHaveLength(1);
        expect(screen.queryAllByTestId('state-value-input')).toHaveLength(1);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(1);
    });

    it('should delete item when click delete', () => {
        render(
            <Provider store={store}>
                <AddStates />
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(screen.queryAllByTestId('state-name-input')).toHaveLength(0);
        expect(screen.queryAllByTestId('state-value-input')).toHaveLength(0);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(0);
    });

    it('should submit successfully with errors',  () => {
        render(
            <Provider store={store}>
                <AddStates />
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(addButton);

        fireEvent.change(screen.getByTestId('state-name-input'), { target: { value: 's0' } })
        fireEvent.click(submitButton);

        expect(store.getState().fsmBuilder.states).toStrictEqual([{ name: 's0', output: {value: ''}}]);
        expect(store.getState().fsmBuilder.errors).toHaveLength(1);
    });
});
