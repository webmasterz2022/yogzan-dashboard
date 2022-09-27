import axios from 'axios'

export function getHomepageImages() {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://yogzan-server-dev.herokuapp.com/gallery/homepage',
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
        `https://yogzan-server-dev.herokuapp.com/gallery/category/${category}${city ? `?city=${city}` : ''}` :
        `https://yogzan-server-dev.herokuapp.com/gallery/${city ? `?city=${city}` : ''}`
      const { data } = await axios({
        method: 'get',
        url
      })
      const indexingImage = data.images.map((img, i) => ({...img, index: i}))
      console.log('add index', indexingImage)
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
        url: `https://yogzan-server-dev.herokuapp.com/gallery/list-city`
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CITY' })
    } catch (error) {
      
    }
  }
}

export function submitHiring(dataForm, cb) {
  return async dispatch => {
    try {
      console.log(dataForm)
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/hiring/submit`,
        // url: `http://localhost:5000/hiring/submit`,
        data: dataForm
      })
      console.log('api responses', data)
      dispatch(cb())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function submitBooking(dataForm, cb) {
  return async () => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/book/submit`,
        // url: `http://localhost:5000/order/booking`,
        data: dataForm
      })
      const message = `Halo Admin! Saya ingin info Pricelist.%0A*Nama:* ${dataForm.name}%0A*Untuk Event:* ${dataForm.layanan}%0A*Tanggal/Bulan:* ${dataForm.date}%0A*Kota:* ${dataForm.city}%0A*Kontak:* ${dataForm.phone}%0ATerimakasih 🙏`
      window.open(`https://wa.me/+6281313269255?text=${message}`, 
      '_blank')
      cb()
    } catch (error) {
      alert(error.message)
    }
  }
}