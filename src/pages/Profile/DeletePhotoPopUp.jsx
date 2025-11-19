import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

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

export const DeletePhotoPopUpStyled = styled.div`
  background-color: #1c1d1f;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  width: 30vw;
  height: 30vh;
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

export const DeletePhotoContainerStyled = styled.div`
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

const DeletePhotosPopUp = ({ onClose, photoIdToDelete, onDeleted}) => {
    const location = useLocation();
    const segments = location.pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    const { token } = useAuth();

    const deleteImageFromCollection = async () => {
        if (!token) return;

        try{
        await axios.patch(`https://pinterdev-api.vercel.app/api/colecciones/${lastSegment}/fotos`, {
            fotoId: photoIdToDelete
        },
            {
            headers: { Authorization: `Bearer ${token}` },
        })
        
        if (onDeleted) onDeleted(photoIdToDelete);
        onClose();

        }catch(error){
        console.log(error);
        
        }

    }

  return (
    <Overlay onClick={onClose}>
      <DeletePhotoPopUpStyled onClick={(e) => e.stopPropagation()}>
        <DeletePhotoContainerStyled>
          <div className="titulos">
            <h2>¿ Desea eliminar la foto de la colección ?</h2>
          </div>
          <Button variant="danger" onClick={deleteImageFromCollection}>Eliminar</Button>
        </DeletePhotoContainerStyled>
      </DeletePhotoPopUpStyled>
    </Overlay>
  );
};

export default DeletePhotosPopUp;