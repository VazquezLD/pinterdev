import styled from "styled-components";
import { useUserCollections } from "../../context/UserColectionsContext";
import Spinner from "../../components/Spinner"
import CollectionCard from "./CollectionCard";


const PhotoGrid = styled.div`
  column-count: 4;
  column-gap: 1rem;
  width: 100%;
  margin-top: 40px;
  padding: 0;
  @media (max-width: 1200px) { column-count: 3; }
  @media (max-width: 900px) { column-count: 2; }
  @media (max-width: 600px) { column-count: 1; }
  & > * {
    break-inside: avoid;
    margin-bottom: 1rem;
    display: inline-block;
    width: 100%;
  }
`;


const Profile = () => {
  const { collections, loading, error } = useUserCollections();
  if (loading) {
    return <Spinner></Spinner>
  }

  if (error) {
    return <div>Error al cargar: {error}</div>;
  }


  return (
    <>
        <h2>Tus Colecciones 📂</h2>
        <PhotoGrid>
          {Array.isArray(collections) && collections.length > 0 ? (
            collections.map((collection) => (<CollectionCard key={collection._id} title={collection.titulo} photoId={collection.fotos[0]}/>))
          ) : (
            <p>No tienes colecciones aún.</p>
          )}
        </PhotoGrid>
    </>
  );
};

export default Profile;


