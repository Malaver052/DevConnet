// github.js — consumo de GitHub API

const devsDestacados = ['torvalds', 'gvanrossum', 'addyosmani', 'tj']

const obtenerPerfil = async (username) => {
  try {
    const respuesta = await fetch(`https://api.github.com/users/${username}`)
    if (!respuesta.ok) throw new Error(`Error con ${username}`)
    return await respuesta.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

const crearTarjeta = ({
  avatar_url,
  html_url,
  name,
  login,
  public_repos,
  bio,
}) => `
  <div class="dev-card" onclick="window.open('${html_url}', '_blank')">
    <img src="${avatar_url}" alt="${login}" />
    <h4>${name ?? login}</h4>
    <p>${public_repos} repositorios</p>
    ${bio ? `<p style="margin-top:4px;font-size:0.75rem">${bio.slice(0, 50)}...</p>` : ''}
  </div>
`

export const cargarDevs = async () => {
  const grid = document.querySelector('#devs-grid')

  try {
    const perfiles = await Promise.all(
      devsDestacados.map((username) => obtenerPerfil(username))
    )

    const tarjetas = perfiles
      .filter((perfil) => perfil !== null)
      .map((perfil) => crearTarjeta(perfil))
      .join('')

    grid.innerHTML =
      tarjetas || '<p class="loading">No se pudieron cargar los perfiles</p>'
  } catch (error) {
    grid.innerHTML = '<p class="loading">Error al cargar desarrolladores</p>'
  }
}
