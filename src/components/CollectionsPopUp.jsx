import styled from "styled-components";
import CollectionsPopUpGrid from "./CollectionsPopUpGrid";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

export const CollectionsPopUpStyled = styled.div`
  background-color: #1c1d1f;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 60vh;
  }
`;

export const CollectionContainerStyled = styled.div`
  width: 90%;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .titulos{
    text-align: center;
    margin-bottom: 20px;
  }
`;

const CollectionsPopUp = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <CollectionsPopUpStyled onClick={(e) => e.stopPropagation()}>
        <CollectionContainerStyled>
          <div className="titulos">
            <h2>Tus colecciones</h2>
            <p>Elije en cúal colección agregar la foto.</p>
          </div>
          <CollectionsPopUpGrid/>
        </CollectionContainerStyled>
      </CollectionsPopUpStyled>
    </Overlay>
  );
};

export default CollectionsPopUp;