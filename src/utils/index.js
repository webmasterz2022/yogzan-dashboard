export const intlNum = '+6282335168686'
// export const domNum = '+6285876020261'
export const domNum = '+6282264580830'


export const intlNation = ['Malaysia', 'Singapore']


export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'; //convert tablet
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

export function shuffle(array) {
  // let currentIndex = array.length,  randomIndex;

  // // While there remain elements to shuffle.
  // while (currentIndex != 0) {

  //   // Pick a remaining element.
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex--;

  //   // And swap it with the current element.
  //   [array[currentIndex], array[randomIndex]] = [
  //     array[randomIndex], array[currentIndex]];
  // }


  for (let i = array.length - 1; i > 0; i--) {
    // Generate random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const bookingViaWA = (num) => {
  const currNum = num || domNum;
  const parsedNum = currNum.replace('+', '')
  window.open(`https://wa.me/${parsedNum}`, '_blank')
}

const regexNumber = /[^0-9]+/g;
export const thousandSeparator = (value) => (
  value && value.replace(regexNumber, '') && thousand(value.replace(/[^0-9]+/g, ''))
);

export const thousand = val => (
  Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
);

export const removeDot = val => {
  if (!val) {
    return val;
  } else if (typeof val === 'number') {
    return val.toString().replace(/\./g, '');
  }
  return val.replace(/\./g, '');
};

export const getPrefixedPath = (path) => {
  if (window?.location?.pathname.startsWith('/en')) {
    return '/en' + (path.startsWith('/') ? path : '/' + path);
  }
  return path;
};

export const getSanitizedPath = (pathname) => {
  return pathname.startsWith('/en') ? pathname.replace('/en', '') : pathname;
}