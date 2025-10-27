import styled from "styled-components";
import { HiOutlineFolder } from "react-icons/hi";
import { useUserCollections } from "../context/UserColectionsContext";
import Spinner from "../components/Spinner";
import { useAddPhoto } from "../context/AddPhotoContext";

const GridContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: #131415;
  border-radius: 12px;
  overflow-y: auto;
  max-height: 70vh;
  border: 1px solid #2a2a2a;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3a3a3a;
    border-radius: 4px;
  }
`;

const CollectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.8rem 1rem;
  color: #e0e0e0;
  font-size: 0.95rem;
  cursor: pointer;
  background-color: transparent;
  border-bottom: 1px solid #1f1f1f;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1f1f1f;
  }

  svg {
    font-size: 1.2rem;
    color: #bdbdbd;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #aaa;
  padding: 2rem 0;
  font-size: 0.9rem;
`;


const CollectionsPopUpGrid = () => {
  const { addPhotoToCollection, loading: saving, error: saveError } = useAddPhoto();
  const { collections, loading: loadingCollections, error: errorCollections } = useUserCollections();

  const handleSelectAndSave = (collectionId) => {
    
    addPhotoToCollection(collectionId);
  };

  if (loadingCollections) return <Spinner />;
  if (errorCollections) return <div>Error al cargar: {errorCollections}</div>;

  return (
    <GridContainer>
      {Array.isArray(collections) && collections.length > 0 ? (
        collections.map((collection) => (
          <CollectionItem
            key={collection._id}
            onClick={() => handleSelectAndSave(collection._id)}
          >
            <HiOutlineFolder />
            {collection.titulo}
          </CollectionItem>
        ))
      ) : (
        <EmptyMessage>No tienes colecciones aún.</EmptyMessage>
      )}

      
      {saving && <p style={{ textAlign: 'center', padding: '1rem' }}>Guardando...</p>}
      {saveError && <p style={{ color: 'red', textAlign: 'center', padding: '1rem' }}>Error: {saveError}</p>}

      
    </GridContainer>
  );
};

export default CollectionsPopUpGrid;
