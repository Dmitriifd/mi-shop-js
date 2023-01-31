const apiPath = 'http://localhost:3000'

export const getData = async (path) => {
  const res = await fetch(`${apiPath + path}`)
	return await res.json()
}
