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
  const response = await fetch(apiPath + path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(res.status)
  }
  return await response.json()
}

export const putData = async (path, data) => {
  const response = await fetch(apiPath + path, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(res.status)
  }
  return await response.json()
}

export const patchData = async (path, data) => {
  const response = await fetch(apiPath + path, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
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
