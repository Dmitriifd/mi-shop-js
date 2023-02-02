const apiPath = 'http://localhost:3001'

export const getData = async (path) => {
  const res = await fetch(`${apiPath + path}`)

	if (res.status == 200) {
    let json = await res.json()
    return json
  }

  throw new Error(res.status)
}
