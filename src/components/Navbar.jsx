function Navbar({
  usuarioActual,
  cerrarSesion,
  cambiarPagina
}) {
  return (
    <nav>
      <h2>Muro ITLA</h2>

      <div>
        <button onClick={() => cambiarPagina("inicio")}>
          Inicio
        </button>

        {usuarioActual ? (
          <button onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <button onClick={() => cambiarPagina("login")}>
              Iniciar sesión
            </button>

            <button onClick={() => cambiarPagina("registro")}>
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;