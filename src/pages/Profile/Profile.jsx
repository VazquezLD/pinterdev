import styled from "styled-components";
import { AppWrapper, ContentWrapper } from "../../styles/AppWrapper";


const PhotoGrid = styled.div`
  column-count: 4;
  column-gap: 1rem;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 1200px) { column-count: 3; }
  @media (max-width: 768px) { column-count: 2; }
  @media (max-width: 480px) { column-count: 1; }
`;

const Profile = () => {

  return (
    <AppWrapper>
      <ContentWrapper>
        
        <h2>Tus Colecciones 📂</h2>
        <PhotoGrid>
          
        </PhotoGrid>
      </ContentWrapper>
    </AppWrapper>
  );
};

export default Profile;


