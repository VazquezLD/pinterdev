import styled from "styled-components";
import { AppWrapper, ContentWrapper } from "../../styles/AppWrapper";
import { useUserCollections } from "../../context/UserColectionsContext";

const PhotoGrid = styled.div`
  column-count: 4;
  column-gap: 1rem;
  width: 100%;
  margin-top: 40px;
  
  @media (max-width: 1200px) { column-count: 3; }
  @media (max-width: 768px) { column-count: 2; }
  @media (max-width: 480px) { column-count: 1; }
`;

const CollectionCard = styled.div`
  break-inside: avoid;
  background-color: #222;
  color: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
`;

const Profile = () => {
  const { collections, loading, error } = useUserCollections();

  if (loading) return <p>Cargando tus colecciones...</p>;
  if (error) return <p>Error al cargar colecciones: {error}</p>;
  if (!collections || collections.length === 0)
    return <p>No tenés colecciones aún 😅</p>;

  return (
    <AppWrapper>
      <ContentWrapper>
        <h2>Aquí se encuentran todas tus colecciones 😄</h2>

        <PhotoGrid>
          {collections.map((col) => (
            <CollectionCard key={col._id}>
              <h3>{col.nombre}</h3>
              {col.fotos?.length > 0 ? (
                <img src={col.fotos[0].url} alt={col.nombre} />
              ) : (
                <p>Sin fotos aún 📁</p>
              )}
            </CollectionCard>
          ))}
        </PhotoGrid>
      </ContentWrapper>
    </AppWrapper>
  );
};

export default Profile;

