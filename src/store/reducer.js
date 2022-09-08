import imgH from '../assets/sample-horizontal.png'
import imgV from '../assets/sample-vertical.png'

const initialState = {
  homepageImages: [imgH, imgV, imgH, imgV, imgH, imgV, imgH, imgV, imgH, imgV, imgH, imgV, imgH, imgV, ],
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