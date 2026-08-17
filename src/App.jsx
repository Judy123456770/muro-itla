import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";
import Registro from "./components/Registro";
import Login from "./components/Login";
import CrearPost from "./components/CrearPost";
import ListaPosts from "./components/ListaPosts";
import Navbar from "./components/Navbar";

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [pagina, setPagina] = useState("inicio");

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(
      auth,
      (usuario) => {
        setUsuarioActual(usuario);

        if (usuario) {
          setPagina("inicio");
        }
      }
    );

    return () => cancelarSuscripcion();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setPagina("inicio");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <Navbar
        usuarioActual={usuarioActual}
        cerrarSesion={cerrarSesion}
        cambiarPagina={setPagina}
      />

      <main>
        {pagina === "inicio" && (
          <>
            <section className="hero">
              <h1>Bienvenido a Muro ITLA</h1>

              <p>
                Comparte tus ideas, opiniones y experiencias
                con la comunidad ITLA.
              </p>
            </section>

            <ListaPosts />

            {usuarioActual && (
              <CrearPost />
            )}

            {!usuarioActual && (
              <section className="mensaje-login">
                <h2>¿Quieres publicar?</h2>

                <p>
                  Inicia sesión o crea una cuenta para
                  compartir tu publicación.
                </p>

                <div>
                  <button
                    onClick={() => setPagina("login")}
                  >
                    Iniciar sesión
                  </button>

                  <button
                    onClick={() => setPagina("registro")}
                  >
                    Crear cuenta
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        {pagina === "login" && !usuarioActual && (
          <Login />
        )}

        {pagina === "registro" && !usuarioActual && (
          <Registro />
        )}
      </main>
    </div>
  );
}

export default App;