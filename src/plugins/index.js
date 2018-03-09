const plugins = {
  filterSex: (num) => {
    switch (num) {
      case 2:
        return '私密'
      case 0:
        return '男'
      case 1:
        return '女'
    }
  },
  delObj: (obj, arr) => {
    arr.forEach((item, index) => {
      delete obj[item]
    })
    return obj
  },
  requestFullScreen () {
    var de = document.documentElement
    if (de.requestFullscreen) {
      de.requestFullscreen()
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen()
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen()
    }
  },
  renderTheme (color) {
    let cssText = ''
    return cssText
  }
}
export default plugins
