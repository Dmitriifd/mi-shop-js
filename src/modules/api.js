const apiPath = 'http://localhost:3001'

export const getData = async (path) => {
  const res = await fetch(`${apiPath + path}`)

  if (res.status == 200) {
    let json = await res.json()
    return json
  }

  throw new Error(res.status)
}

export const postData = async (path, data) => {
  const response = await fetch(apiPath + path, data)
  if (!response.ok) {
    throw new Error(res.status)
  }
  return await response.json()
}

export const deleteData = async (path) => {
  const response = await fetch(apiPath + path, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(res.status)
  }
  return await response.json()
}
