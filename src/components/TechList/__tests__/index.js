import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '../index';

describe('TechList Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should be able to add new tech', () => {
        const { getByText, getByTestId, getByLabelText } = render(<TechList />);
        // debug();

        fireEvent.change(getByLabelText('Tech'), {
            target: { value: 'Node.js' },
        });

        fireEvent.submit(getByTestId('tech-form'));
        // debug();

        expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
        expect(getByLabelText('Tech')).toHaveValue('');
    });

    it('should store techs in storage', () => {
        let { getByText, getByTestId, getByLabelText } = render(<TechList />);

        fireEvent.change(getByLabelText('Tech'), {
            target: { value: 'Node.js' },
        });

        fireEvent.submit(getByTestId('tech-form'));

        cleanup();

        ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

        expect(localStorage.setItem).toHaveBeenCalledWith(
            'techs',
            JSON.stringify(['Node.js'])
        );

        expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    });
});
