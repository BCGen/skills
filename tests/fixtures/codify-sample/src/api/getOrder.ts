import { internalClient } from './client'
export const getOrder = (id) => internalClient.get('/orders/' + id)
