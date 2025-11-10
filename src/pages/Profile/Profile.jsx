import styled from "styled-components";
import { useUserCollections } from "../../context/UserColectionsContext";
import Spinner from "../../components/Spinner";
import CollectionCard from "./CollectionCard";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;


const StyledPopUp = styled.div`
  background-color: #1c1d1f;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  width: 420px;
  padding: 2rem;
  color: white;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  h3 {
    margin-bottom: 1rem;
  }

  p {
    color: #b0b0b0;
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`;

const Button = styled.button`
  background-color: ${({ variant }) =>
    variant === "danger" ? "#e63946" : "transparent"};
  border: 1px solid
    ${({ variant }) => (variant === "danger" ? "#e63946" : "white")};
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "danger" ? "#d62828" : "rgba(255,255,255,0.1)"};
    transform: scale(1.03);
  }
`;

const PhotoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    justify-items: center; 
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin-top: 5px;
`;

const Profile = () => {
  const [clicked, setClicked] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const { collections, loading, error } = useUserCollections();
  const {token} = useAuth();
  const [localCollections, setLocalCollections] = useState([]);
  useEffect(() => {
      setLocalCollections(collections);
  }, [collections]);


  const deleteDataCollection = async (id) => {
  if (!token) return;
  try {
    await axios.delete(`https://pinterdev-api.vercel.app/api/colecciones/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClicked(false);
    setLocalCollections((prev) => prev.filter((c) => c._id !== id));
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};


  if (loading) return <Spinner />;
  if (error) return <div>Error al cargar: {error}</div>;

  return (
    <>
      <h2>Tus Colecciones 📂</h2>
    
      <PhotoGrid>
        {Array.isArray(localCollections) && localCollections.length > 0 ? (
          localCollections.map((collection) => (
            <CollectionCard
              key={collection._id}
              title={collection.titulo}
              photoId={collection.fotos[0] || null}
              setClicked={setClicked}
              setIdToDelete={setIdToDelete}
              id={collection._id}
            />
          ))
        ) : (
          <p>No tienes colecciones aún.</p>
        )}
      </PhotoGrid>

      {clicked && (
        <Overlay>
          <StyledPopUp>
            <h3>¿Eliminar colección?</h3>
            <div className="buttons">
              <Button onClick={() => setClicked(false)}>Cancelar</Button>
              <Button variant="danger" onClick={() => {deleteDataCollection(idToDelete);
                setClicked(false)}
              }>
                Eliminar
              </Button>
            </div>
          </StyledPopUp>
        </Overlay>
      )}
    </>
  );
};

export default Profile;



