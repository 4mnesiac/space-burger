import cartReducer, {
  initialState,
  addIngredient,
  deleteIngredient,
  resetCart,
  moveIngredient,
  countTotal,
} from './cartSlice'
const testFiller = { _id: '60d3b41abdacab0026a733c8', name: 'Начинка', type: 'main' }

describe('check cart reducers', () => {
  it('should return the initial state', () => {
    const reducer = cartReducer(undefined, {})
    expect(reducer).toEqual(initialState)
  })
  // addIngredient
  it('should add ingredient to cart', () => {
    const bun = { item: { _id: '60d3b41abdacab0026a733c8', name: 'Булка', type: 'bun' } }
    const reducer = cartReducer(initialState, addIngredient(bun))
    const result = {
      ...initialState,
      sortedCart: {
        bun: bun.item,
        fillers: [],
      },
      counts: {
        [bun.item._id]: 1,
      },
    }
    expect(reducer).toEqual(result)
  })
  // deleteIngredient
  it('should delete filler from store', () => {
    const reducer = cartReducer(
      {
        ...initialState,
        counts: {
          [testFiller._id]: 1,
        },
        sortedCart: { fillers: [testFiller] },
      },
      deleteIngredient({ id: testFiller._id, itemIndex: 0 }),
    )
    const result = {
      ...initialState,
      counts: {
        [testFiller._id]: 0,
      },
      sortedCart: {
        fillers: [],
      },
    }
    expect(reducer).toEqual(result)
  })
  // resetCart
  it('should reset state to default', () => {
    const reducer = cartReducer(
      {
        ...initialState,
        counts: {
          [testFiller._id]: 1,
        },
        sortedCart: { fillers: [testFiller] },
      },
      resetCart(),
    )

    expect(reducer).toEqual(initialState)
  })
  // moveIngredient
  it('should change index of two elements in list', () => {
    const reducer = cartReducer(
      { ...initialState, sortedCart: { fillers: [{ name: 'first' }, { name: 'second' }] } },
      moveIngredient({ dragIndex: 0, dropIndex: 3 }),
    )
    // перемещаем с первой позиции на 4 для наглядности
    const result = {
      ...initialState,
      sortedCart: { fillers: [undefined, { name: 'second' }, undefined, { name: 'first' }] },
    }
    expect(reducer).toEqual(result)
  })
  // countTotal
  it('should count cart total price', () => {
    const reducer = cartReducer(
      {
        ...initialState,
        sortedCart: {
          bun: { price: 50 },
          fillers: [{ item: { price: 50 } }, { item: { price: 50 } }],
        },
      },
      countTotal(),
    )
    // проверяем что булка считается х2
    const result = {
      ...initialState,
      total: 200,
      sortedCart: {
        bun: { price: 50 },
        fillers: [{ item: { price: 50 } }, { item: { price: 50 } }],
      },
    }
    expect(reducer).toEqual(result)
  })
})
