import styled, { keyframes } from 'styled-components';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { useAddPhoto } from "../context/AddPhotoContext";
import { useNavigate, useLocation } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled.div`
  margin-bottom: 1rem;
  break-inside: avoid-column;
  overflow: hidden; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  color: white;
  background-color: transparent;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const ButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  display: flex;
  background-color: #0000006a;
  padding: 2px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const ButtonContainer = styled.div`
    width: fit-content;
    transition: all 0.3s ease-in-out;
    border-radius: 0;
    background-color: transparent;
    color: white;
    padding: 2px;

    &:hover {
      border-radius: 100%;
      background-color: white;
      color: black;
      transform: scale(1.2);
    }
`

const PhotoImg = styled.img`
  border-radius: 16px;
  width: 100%;
  height: auto;
  display: block;
`;

const PhotoCard = ({photo, setShowPopup, setShowPopUpdelete, setPhotoIdToDelete}) => {
  const location = useLocation();
  const showDots = location.pathname.startsWith("/collections");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photo/${photo.id}`, { state: { photo } });
  };

  const {setPhotoId} = useAddPhoto()
  if (!photo || !photo.urls) {
    return null;
  }
  
  return (
    <CardWrapper>
      <PhotoImg src={photo.urls.regular} alt={photo.alt_description} onClick={handleClick}/>
      <ButtonsContainer>
        <ButtonContainer>
          <CiBookmark onClick={() => {setShowPopup(true), setPhotoId(photo.id)}}/>
        </ButtonContainer>
        {showDots && (
          <ButtonContainer>
            <HiOutlineDotsHorizontal onClick={() => {setShowPopUpdelete(true), setPhotoIdToDelete(photo.id)}}/>
          </ButtonContainer>
        )}
      </ButtonsContainer>
    </CardWrapper>
  );
};

export default PhotoCard;