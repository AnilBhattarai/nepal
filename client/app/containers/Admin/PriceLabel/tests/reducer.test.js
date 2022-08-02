// import produce from 'immer';
import priceLabelReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('priceLabelReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      defaultData: 'defaultData',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(priceLabelReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
