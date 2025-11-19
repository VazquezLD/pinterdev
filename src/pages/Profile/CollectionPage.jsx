import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import PhotoCard from "../../components/PhotoCard";
import Spinner from "../../components/Spinner";
import DeletePhotosPopUp from "./DeletePhotoPopUp";

const PhotoGrid = styled.div`
    column-count: 4;
    column-gap: 1rem;
    width: 100%;
    margin-top: 40px;
    color: white;
    @media (max-width: 1200px) { column-count: 3; }
    @media (max-width: 768px) { column-count: 2; }
    @media (max-width: 480px) { column-count: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  min-height: 100vh;
  background-color: #19191a;
  color: white;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Message = styled.p`
  color: #ccc;
  text-align: center;
  margin-top: 1rem;
`;

const CollectionPage = () => {
  const [showPopUpDelete, setShowPopUpdelete] = useState(false)
  const [photoIdToDelete, setPhotoIdToDelete] = useState("")
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImgs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`https://pinterdev-api.vercel.app/api/colecciones/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const photoIds = response.data.fotos || [];
        if (photoIds.length === 0) {
          setPhotos([]);
          return;
        }

        const accessKey = "HSk-TwxnSZsDrnRdsNu1KPGHsZMwQz1Hay_h6_J95go";
        const fetchedPhotos = await Promise.all(
          photoIds.map(async (photoId) => {
            const res = await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=${accessKey}`);
            if (!res.ok) throw new Error(`Error al obtener la foto ${photoId}`);
            return res.json();
          })
        );

        setPhotos(fetchedPhotos);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.msg || "Error al cargar las fotos de la colección.");
      } finally {
        setLoading(false);
      }
    };

    fetchImgs();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <Message>{error}</Message>;

  return (
    <Container>
      <Title>Fotos de la colección</Title>

      {photos.length === 0 ? (
        <Message>No hay fotos en esta colección todavía.</Message>
      ) : (
        <PhotoGrid>
          {showPopUpDelete && (<DeletePhotosPopUp onClose = {() => setShowPopUpdelete(false)} photoIdToDelete={photoIdToDelete} onDeleted={(photoIdToDelete) => 
            setPhotos(prev => prev.filter(p => p.id !== photoIdToDelete))}/>)}
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} setShowPopUpdelete={setShowPopUpdelete} setPhotoIdToDelete={setPhotoIdToDelete}/>
          ))}
        </PhotoGrid>
      )}
    </Container>
  );
};

export default CollectionPage;
