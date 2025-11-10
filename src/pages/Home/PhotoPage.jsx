import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../../components/Spinner";

const PageContainer = styled.div`
  width: 100%;
  background-color: #131415;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  box-sizing: border-box;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const PhotoWrapper = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
`;

const InfoWrapper = styled.div`
    margin-left: 10px;
    flex: 1;
    max-width: 45%;
    background-color: #1c1d1f;
    color: #f1f1f1;
    padding: 2rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
    overflow-y: auto;
    max-height: 80vh;
    scrollbar-width: thin;
    scrollbar-color: #555 #1c1d1f;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
  }

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
`;

const Meta = styled.div`
  font-size: 0.95rem;
  color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  span strong {
    color: #fff;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #d8d8d8;
  line-height: 1.5;
  margin-top: 0.5rem;
  white-space: pre-line;
`;

const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.95rem;
  color: #bfbfbf;

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #555;
`;

const Button = styled.a`
  text-decoration: none;
  color: white;
  background-color: #4f46e5;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  width: fit-content;
  transition: background 0.2s ease;
  &:hover {
    background-color: #6366f1;
  }
`;

const PhotoPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [photo, setPhoto] = useState(state?.photo || null);
  const [loading, setLoading] = useState(!state?.photo);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        
        const accessKey = "HSk-TwxnSZsDrnRdsNu1KPGHsZMwQz1Hay_h6_J95go";
        const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: { Authorization: `Client-ID ${accessKey}` },
        });
        setPhoto(res.data);
      } catch (err) {
        console.error("Error al cargar la foto:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!state?.photo) fetchPhoto();
  }, [id, state?.photo]);

  if (loading) return <Spinner/>;
  if (!photo) return <p style={{ color: "white", textAlign: "center" }}>No se encontró la foto.</p>;

  const { user, likes, created_at, color, width, height, description, sponsorship, exif, location, urls, alt_description, links } = photo;

  return (
    <PageContainer>
      <PhotoWrapper>
        <Photo src={urls?.regular} alt={alt_description || "Foto"} />
      </PhotoWrapper>

      <InfoWrapper>
        <Title>{alt_description || "Sin título"}</Title>

        <Meta>
          <span>👤 <strong>{user?.name}</strong> @{user?.username}</span>
          <span>📅 {new Date(created_at).toLocaleDateString()}</span>
          {location?.name && <span>📍 {location.name}</span>}
          {sponsorship && <span>💼 Sponsor: {sponsorship.sponsor.name}</span>}
        </Meta>

        {description && <Description>{description}</Description>}

        <StatRow>
          <span>❤️ {likes} likes</span>
          <span>📏 {width} × {height}px</span>
          {color && (
            <span>
              🎨 Color: {color}
              <ColorBox style={{ backgroundColor: color }} />
            </span>
          )}
          {exif?.name && <span>📸 {exif.name}</span>}
        </StatRow>

        <Button href={links?.html} target="_blank" rel="noopener noreferrer">
          Ver en Unsplash
        </Button>
      </InfoWrapper>
    </PageContainer>
  );
};

export default PhotoPage;

