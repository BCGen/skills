import { internalClient } from './client'
export const getUser = (id) => internalClient.get('/users/' + id)
