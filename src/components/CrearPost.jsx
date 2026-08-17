import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function CrearPost() {
  const [contenido, setContenido] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!auth.currentUser) return;

      try {
        const documento = await getDoc(
          doc(db, "usuarios", auth.currentUser.uid)
        );

        if (documento.exists()) {
          setNombreUsuario(documento.data().usuario);
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };

    obtenerUsuario();
  }, []);

  const publicar = async (e) => {
    e.preventDefault();

    if (contenido.trim() === "") {
      alert("Escribe algo antes de publicar.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        contenido: contenido.trim(),
        usuario: nombreUsuario,
        fecha: serverTimestamp(),
      });

      setContenido("");

      alert("¡Publicación creada!");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error al publicar: " + error.message);
    }
  };

  return (
    <div className="create-post">
      <h2>Crear publicación</h2>

      <form onSubmit={publicar}>
        <textarea
          placeholder="¿Qué quieres publicar?"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows="5"
        />

        <button type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default CrearPost;