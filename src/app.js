// --- Seleccionar elementos del DOM ---
const btnRegistro = document.querySelector('#btn-registro')
const btnCerrar = document.querySelector('#btn-cerrar')
const btnConfirmar = document.querySelector('#btn-confirmar')
const modalRegistro = document.querySelector('#modal-registro')
const inputNombre = document.querySelector('#input-nombre')
const inputEmail = document.querySelector('#input-email')

// --- Funcionalidad 1: Abrir modal ---
btnRegistro.addEventListener('click', () => {
  modalRegistro.classList.add('activo')
})

// --- Funcionalidad 2: Cerrar modal ---
btnCerrar.addEventListener('click', () => {
  modalRegistro.classList.remove('activo')
})

// Cerrar si hace clic fuera del modal
modalRegistro.addEventListener('click', (evento) => {
  if (evento.target === modalRegistro) {
    modalRegistro.classList.remove('activo')
  }
})

// --- Funcionalidad 3: Validar formulario ---
const validarFormulario = () => {
  const nombre = inputNombre.value.trim()
  const email = inputEmail.value.trim()

  if (nombre === '') {
    alert('Por favor escribe tu nombre')
    return false
  }

  if (email === '' || !email.includes('@')) {
    alert('Por favor escribe un email válido')
    return false
  }

  return true
}

// --- Funcionalidad 4: Confirmar registro ---
btnConfirmar.addEventListener('click', () => {
  if (!validarFormulario()) return

  const nombre = inputNombre.value.trim()

  // Cerrar modal
  modalRegistro.classList.remove('activo')

  // Mostrar bienvenida
  alert(`¡Bienvenido a DevConnect, ${nombre}! `)

  // Limpiar inputs
  inputNombre.value = ''
  inputEmail.value = ''
})

// --- Funcionalidad 5: Navbar al hacer scroll ---
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
  } else {
    navbar.style.boxShadow = 'none'
  }
})

// Lista de devs famosos para mostrar
const devsDestacados = ['torvalds', 'gvanrossum', 'addyosmani', 'tj']

// Función para obtener un perfil de GitHub
const obtenerPerfilGitHub = async (username) => {
  try {
    const respuesta = await fetch(`https://api.github.com/users/${username}`)

    if (!respuesta.ok) {
      throw new Error(`No se pudo obtener el perfil de ${username}`)
    }

    const perfil = await respuesta.json()
    return perfil
  } catch (error) {
    console.error(error)
    return null
  }
}

// Función para crear la tarjeta HTML de un dev
const crearTarjetaDev = (perfil) => {
  return `
    <div class="dev-card" onclick="window.open('${perfil.html_url}', '_blank')">
      <img src="${perfil.avatar_url}" alt="${perfil.login}" />
      <h4>${perfil.name || perfil.login}</h4>
      <p>${perfil.public_repos} repositorios</p>
    </div>
  `
}

// Función principal — carga todos los devs
const cargarDevs = async () => {
  const grid = document.querySelector('#devs-grid')

  // Pedir todos los perfiles al mismo tiempo (en paralelo)
  const perfiles = await Promise.all(
    devsDestacados.map((username) => obtenerPerfilGitHub(username))
  )

  // Filtrar los que fallaron y construir el HTML
  const tarjetas = perfiles
    .filter((perfil) => perfil !== null)
    .map((perfil) => crearTarjetaDev(perfil))
    .join('')

  grid.innerHTML = tarjetas
}
// Ejecutar cuando cargue la página
cargarDevs()
