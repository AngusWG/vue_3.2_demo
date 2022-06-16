import request from './requests'

export const menuList = () => {
    return request({
        url: '/menus'
    })
}
