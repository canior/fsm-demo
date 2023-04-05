import {fireEvent, render, screen} from '@testing-library/react';
import {store} from "../../../../app/store";
import {Provider} from "react-redux";
import React from "react";
import AddInputs from "../../../../features/fsm/components/AddInputs";

describe('AddInputs Component Tests', () => {
    it('should display normally', () => {
        render(
            <Provider store={store}>
                <AddInputs/>
            </Provider>);

        expect(screen.queryByTestId('add-button')).toBeDefined();
        expect(screen.queryByTestId('input-input')).toBeNull();
        expect(screen.queryByTestId('delete-button')).toBeNull();
    });

    it('should add item when click add', () => {
        render(
            <Provider store={store}>
                <AddInputs/>
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        expect(screen.queryAllByTestId('input-input')).toHaveLength(1);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(1);
    });

    it('should delete item when click delete', () => {
        render(
            <Provider store={store}>
                <AddInputs/>
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(screen.queryAllByTestId('input-input')).toHaveLength(0);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(0);
    });

    it('should submit successfully with errors', () => {
        render(
            <Provider store={store}>
                <AddInputs/>
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(addButton);
        fireEvent.click(submitButton);

        expect(store.getState().fsmBuilder.fsmInputs).toStrictEqual([{value: ''}]);
        expect(store.getState().fsmBuilder.errors).toHaveLength(1);
    });
});
