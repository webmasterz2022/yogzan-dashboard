import axios from 'axios'

export function getHomepageImages() {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://yogzan-server-dev.heroku.com/gallery/hompage'
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_HOMEPAGE' })
    } catch (error) {
      
    }
  }
}

export function getPortfolioImages(category) {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.heroku.com/gallery/${category || ''}`
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_PORTFOLIO' })
    } catch (error) {
      
    }
  }
}