import styled, { keyframes } from 'styled-components';
import { HiOutlineDotsHorizontal } from "react-icons/hi";


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
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  color: white;
  
  animation: ${fadeIn} 0.6s ease-out;
  &:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      cursor: pointer;
  }
`;


const PhotoImg = styled.img`
  border-radius: 16px;
  width: 100%;
  height: auto;
  display: block;
`;

const PhotoCard = ({ photo }) => {
  if (!photo || !photo.urls) {
    return null;
  }
  
  return (
    <CardWrapper>
      <PhotoImg src={photo.urls.regular} alt={photo.alt_description} />
      <HiOutlineDotsHorizontal/>
    </CardWrapper>
  );
};

export default PhotoCard;