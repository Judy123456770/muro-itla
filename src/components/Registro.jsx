import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function Registro() {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const registrar = async (e) => {
    e.preventDefault();

    if (!usuario || !correo || !clave || !nombre || !apellido) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const resultado = await createUserWithEmailAndPassword(
        auth,
        correo,
        clave
      );

      await setDoc(doc(db, "usuarios", resultado.user.uid), {
        usuario: usuario,
        correo: correo,
        nombre: nombre,
        apellido: apellido,
      });

      alert("¡Usuario registrado correctamente!");

      setUsuario("");
      setCorreo("");
      setClave("");
      setNombre("");
      setApellido("");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        alert("Este correo ya está registrado.");
      } else if (error.code === "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        alert("El correo electrónico no es válido.");
      } else {
        alert("Error al registrar el usuario.");
      }
    }
  };

  return (
    <section className="auth-container">
      <form onSubmit={registrar}>
        <h2>Crear cuenta</h2>

        <p className="form-description">
          Regístrate para comenzar a publicar en Muro ITLA.
        </p>

        <label>Nombre de usuario</label>

        <input
          type="text"
          placeholder="Ejemplo: judy123"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <label>Correo electrónico</label>

        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label>Contraseña</label>

        <input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <label>Nombre</label>

        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Apellido</label>

        <input
          type="text"
          placeholder="Tu apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <button type="submit">
          Crear cuenta
        </button>
      </form>
    </section>
  );
}

export default Registro;