const initialState = {
  homepageImages: [],
  portfolioImages: []
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
    default:
      return state
  }
}