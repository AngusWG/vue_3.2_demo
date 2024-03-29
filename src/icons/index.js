import SvgIcon from '@/components/SvgIcon/IndexView.vue'

const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach(key => { svgRequired(key) })

export default app => {
    app.component('svg-icon', SvgIcon)
}
