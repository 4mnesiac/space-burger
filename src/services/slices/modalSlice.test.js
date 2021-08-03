import modalReducer, { initialState, openDetailsModal, closeDetailsModal, openOrderModal, closeOrderModal } from './modalSlice';

// проверка синхронных экшенов
describe('check actions and reducers of modalSlice', () => {
    it('should open the Details Modal', ()=> {
    const newState = { ...initialState, isDetailsModalOpen: true }
    const reducer = modalReducer(newState, openDetailsModal());
    const expectedAction = {
      type: 'modal/openDetailsModal',
    }
    expect(openDetailsModal()).toEqual(expectedAction)
    expect(reducer).toEqual(newState)
  })

  it('should close the Details Modal', ()=> {
    const newState = { ...initialState,  isDetailsModalOpen: false }
    const reducer = modalReducer(newState, closeDetailsModal());
    const expectedAction = {
      type: 'modal/closeDetailsModal',
    }
    expect(closeDetailsModal()).toEqual(expectedAction)
    expect(reducer).toEqual(newState)
  })
  it('should open the Order Modal', ()=> {
    const newState = { ...initialState,  isOrderModalOpen: true }
    const reducer = modalReducer(newState, openOrderModal());
    const expectedAction = {
      type: 'modal/openOrderModal',
    }
    expect(openOrderModal()).toEqual(expectedAction)
    expect(reducer).toEqual(newState)
  })

  it('should close the Order Modal', ()=> {
    const newState = { ...initialState,  isOrderModalOpen: false }
    const reducer = modalReducer(newState, closeOrderModal());
    const expectedAction = {
      type: 'modal/closeOrderModal',
    }
    expect(closeOrderModal()).toEqual(expectedAction)
    expect(reducer).toEqual(newState)
  })

})

