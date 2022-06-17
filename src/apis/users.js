import request from './requests'

export const getUser = (params) => {
    return request({
        url: '/users',
        params
    })
}
