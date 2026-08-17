import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!usuario || !clave) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        usuario,
        clave
      );

      alert("¡Inicio de sesión exitoso!");

      setUsuario("");
      setClave("");
    } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Correo o contraseña incorrectos.");
      } else if (error.code === "auth/invalid-email") {
        alert("El correo electrónico no es válido.");
      } else {
        alert("Error al iniciar sesión.");
      }
    }
  };

  return (
    <section className="auth-container">
      <form onSubmit={iniciarSesion}>
        <h2>Iniciar sesión</h2>

        <p className="form-description">
          Ingresa a tu cuenta para publicar en Muro ITLA.
        </p>

        <label>Correo electrónico</label>

        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <label>Contraseña</label>

        <input
          type="password"
          placeholder="Tu contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <button type="submit">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

export default Login;