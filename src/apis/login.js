import request from './requests'

export const login = (data) => {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}
