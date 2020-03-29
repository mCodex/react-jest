import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import { getTechs } from '../sagas';
import { getTechSuccess, getTechsFailure } from '../actions';

const apiMock = new MockAdapter(api);

describe('Techs Saga', () => {
    it('should be able to fetch techs', async () => {
        const dispatch = jest.fn();

        apiMock.onGet('techs').reply(200, ['Node.js']);

        await runSaga({ dispatch }, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechSuccess(['Node.js']));
    });

    it('should fail when API return error', async () => {
        const dispatch = jest.fn();

        apiMock.onGet('techs').reply(400);

        await runSaga({ dispatch }, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
    });
});
