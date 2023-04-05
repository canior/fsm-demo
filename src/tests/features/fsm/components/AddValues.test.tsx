import {fireEvent, render, screen} from '@testing-library/react';
import AddValues from '../../../../features/fsm/components/AddValues';
import {store} from "../../../../app/store";
import {Provider} from "react-redux";
import React from "react";

describe('AddValues Component Tests', () => {
    it('should display normally', () => {
        render(
            <Provider store={store}>
                <AddValues />
            </Provider>);

        expect(screen.queryByTestId('add-button')).toBeDefined();
        expect(screen.queryByTestId('value-input')).toBeNull();
        expect(screen.queryByTestId('delete-button')).toBeNull();
    });

    it('should add item when click add', () => {
        render(
            <Provider store={store}>
                <AddValues />
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        expect(screen.queryAllByTestId('value-input')).toHaveLength(1);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(1);
    });

    it('should delete item when click delete', () => {
        render(
            <Provider store={store}>
                <AddValues />
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(screen.queryAllByTestId('value-input')).toHaveLength(0);
        expect(screen.queryAllByTestId('delete-button')).toHaveLength(0);
    });

    it('should display error when invalid submit', () => {
        render(
            <Provider store={store}>
                <AddValues />
            </Provider>);

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(store.getState().fsmBuilder.errors).toHaveLength(1);
    });

    it('should submit successfully and update store', () => {
        render(
            <Provider store={store}>
                <AddValues />
            </Provider>);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const inputValue = screen.getByTestId('value-input');
        fireEvent.change(inputValue, { target: { value: '0' } })

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(store.getState().fsmBuilder.values).toStrictEqual([{ value: '0'}]);
    });
});
