import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../firebase";

function ListaPosts() {
  const [posts, setPosts] = useState([]);

  const obtenerPosts = async () => {
    try {
      const consulta = query(
        collection(db, "posts"),
        orderBy("fecha", "desc")
      );

      const resultado = await getDocs(consulta);

      const publicaciones = resultado.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setPosts(publicaciones);
    } catch (error) {
      console.error("Error obteniendo publicaciones:", error);
    }
  };

  useEffect(() => {
    obtenerPosts();
  }, []);

  return (
  <div className="posts-container">
      <h2>Publicaciones</h2>

      {posts.length === 0 ? (
        <p>No hay publicaciones todavía.</p>
      ) : (
        posts.map((post) => (
         <div className="post" key={post.id}>
            <h3>{post.usuario}</h3>

            <p>{post.contenido}</p>

            <small>
              {post.fecha?.toDate().toLocaleString()}
            </small>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ListaPosts;