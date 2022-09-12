const initialState = {
  homepageImages: [],
  portfolioImages: {
    meta: {},
    images: []
  },
  cities: []
}

export default function reducer(state = initialState, action) {
  const { type } = action
  switch (type) {
    case 'DATA_FETCHED_HOMEPAGE':
      return {
        ...state,
        homepageImages: action.payload
      }
    case 'DATA_FETCHED_PORTFOLIO':
      return {
        ...state,
        portfolioImages: action.payload
      }
    case 'DATA_FETCHED_CITY':
      return {
        ...state,
        cities: action.payload
      }
    default:
      return state
  }
}