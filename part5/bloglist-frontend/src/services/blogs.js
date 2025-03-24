import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let axiosConfig = {
  headers: {
    Authorization: null
  }
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
  axiosConfig.headers.Authorization = token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('Sending....')

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {

  try{
    const response = await axios.delete(`${baseUrl}/${id}`, axiosConfig)
    return response.data
  }catch(error){
    console.log(error.message)
  }
}

export default { getAll, create, update, remove, setToken }