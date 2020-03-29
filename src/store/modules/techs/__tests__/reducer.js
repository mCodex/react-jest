import reducer, { INITIAL_STATE } from '../reducer';
import * as Techs from '../actions';

describe('Techs Reducer', () => {
    it('ADD_TECH', () => {
        const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

        expect(state).toStrictEqual(['Node.js']);
    });
});
