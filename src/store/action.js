import axios from 'axios'

export function getHomepageImages() {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://yogzan-server.herokuapp.com/gallery/homepage',
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_HOMEPAGE' })
    } catch (error) {
      
    }
  }
}

export function getPortfolioImages(category, city) {
  return async dispatch => {
    try {
      const url = (category && category !== 'Semua') ? 
        `https://yogzan-server.herokuapp.com/gallery/category/${category}${city ? `?city=${city}` : ''}` :
        `https://yogzan-server.herokuapp.com/gallery/${city ? `?city=${city}` : ''}`
      const { data } = await axios({
        method: 'get',
        url
      })
      const indexingImage = data.images.map((img, i) => ({...img, index: i}))
      dispatch({ payload: {...data, images: indexingImage}, type: 'DATA_FETCHED_PORTFOLIO' })
    } catch (error) {
      
    }
  }
}

export function getCities(category) {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server.herokuapp.com/gallery/list-city`
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CITY' })
    } catch (error) {
      
    }
  }
}

export function submitHiring(dataForm, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'submitHiring', payload: true})
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server.herokuapp.com/hiring/submit`,
        // url: `http://localhost:5000/hiring/submit`,
        data: dataForm
      })
      cb()
      dispatch({type: 'SET_LOADING', key: 'submitHiring', payload: false})
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'submitHiring', payload: false})
      alert(error.message)
    }
  }
}

export function submitBooking(dataBooking, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'submitBooking', payload: true})
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server.herokuapp.com/book/submit`,
        // url: `http://localhost:5000/book/submit`,
        data: dataBooking
      })
      cb()
      dispatch({type: 'SET_LOADING', key: 'submitBooking', payload: false})
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'submitBooking', payload: false})
      alert(error.message)
    }
  }
}

export function submitFixBooking(dataBooking, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'submitFixBooking', payload: true})
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/fixbook/submit`,
        // url: `http://localhost:5000/book/submit`,
        data: dataBooking
      })
      cb()
      dispatch({type: 'SET_LOADING', key: 'submitFixBooking', payload: false})
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'submitFixBooking', payload: false})
      alert(error.message)
    }
  }
}

export function getAllCategories() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'category', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/category`,
        // url: `http://localhost:5000/category`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CATEGORY' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getHomepageCategories() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'category', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/category/homepage`,
        // url: `http://localhost:5000/category/homepage`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CATEGORY' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getGalleryCategories() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'category', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/category/gallery`,
        // url: `http://localhost:5000/category/gallery`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CATEGORY' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getAllTestimonies() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'testimony', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/testimony`,
        // url: `http://localhost:5000/testimony`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_TESTIMONY' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getStoredPhotos(linkphoto, cb) {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/fixbook/photo-result`,
        // url: `http://localhost:5000/fixbook/photo-result`,
        data: { linkphoto }
      })
      cb(data)
    } catch (error) {
      cb()
    }
  }
}