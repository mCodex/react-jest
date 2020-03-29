import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '../index';

import { addTech } from '~/store/modules/techs/actions';

jest.mock('react-redux');

describe('TechList Component', () => {
    it('should render tech list', () => {
        useSelector.mockImplementation(cb =>
            cb({
                techs: ['Node.js', 'React'],
            })
        );

        const { getByTestId, getByText } = render(<TechList />);

        expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
        expect(getByTestId('tech-list')).toContainElement(getByText('React'));
    });

    it('should be able to add new tech', () => {
        const { getByTestId, getByText, getByLabelText } = render(<TechList />);

        const dispatch = jest.fn();

        useDispatch.mockReturnValue(dispatch);

        fireEvent.change(getByLabelText('Tech'), {
            target: { value: 'Node.js' },
        });

        fireEvent.submit(getByTestId('tech-form'));

        // console.log(dispatch.mock.calls);

        expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
    });
});

// describe('TechList Component', () => {
//     beforeEach(() => {
//         localStorage.clear();
//     });

//     it('should be able to add new tech', () => {
//         const { getByText, getByTestId, getByLabelText } = render(<TechList />);
//         // debug();

//         fireEvent.change(getByLabelText('Tech'), {
//             target: { value: 'Node.js' },
//         });

//         fireEvent.submit(getByTestId('tech-form'));
//         // debug();

//         expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
//         expect(getByLabelText('Tech')).toHaveValue('');
//     });

//     it('should store techs in storage', () => {
//         let { getByText, getByTestId, getByLabelText } = render(<TechList />);

//         fireEvent.change(getByLabelText('Tech'), {
//             target: { value: 'Node.js' },
//         });

//         fireEvent.submit(getByTestId('tech-form'));

//         cleanup();

//         ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

//         expect(localStorage.setItem).toHaveBeenCalledWith(
//             'techs',
//             JSON.stringify(['Node.js'])
//         );

//         expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
//     });
// });
