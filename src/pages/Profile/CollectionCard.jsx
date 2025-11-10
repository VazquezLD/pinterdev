import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { BsTrash } from "react-icons/bs";

const CollectionCardStyled = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background-color: #f1f1f1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.6rem 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .icons{
    display: flex;
    gap: 5px;
  }
  .footer .dots {
    font-size: 1.2rem;
    cursor: pointer;
    transition: opacity 0.2s ease;
    border-radius: 100%;
    transition: all 0.3s ease;
  }

  .footer .dots:hover {
    background-color: white;
    color: black;
  }
`;

const PortadaImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const CollectionCard = ({ title, photoId, setClicked, setIdToDelete, id}) => {
    
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortada = async () => {
            setLoading(true);
            setError(null);
            try {
                // Se que la key deberia estar oculta pero es un proyecto de portfolio... Ademas es una API gratuita.
                const accessKey = 'HSk-TwxnSZsDrnRdsNu1KPGHsZMwQz1Hay_h6_J95go';
                const response = await fetch(`https://api.unsplash.com/photos/${photoId}`, {
                    headers: {
                        Authorization: `Client-ID ${accessKey}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo obtener la foto`);
                }

                const data = await response.json();
                setImageUrl(data.urls.small);

            } catch (err) {
                console.error("Error fetching portada:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (photoId) {
            fetchPortada();
        } else {
            setLoading(false);
        }

    }, [photoId]);

    if (loading) {
        return <Spinner></Spinner>
    }

    if (error) {
        return <CollectionCardStyled>Error: {error}</CollectionCardStyled>;
    }

    return (
        <>
            <CollectionCardStyled>
            {imageUrl ? (
                <PortadaImage src={imageUrl} alt={`Portada de ${title}`} />
            ) : (
                <p>Sin portada</p>
            )}
            <div className="footer">
                <span>{title}</span>
                <div className="icons">
                    <BsTrash className="dots" onClick={() => {setClicked(true); 
                    setIdToDelete(id)}}/>
                </div>
            </div>
            </CollectionCardStyled>
        </>
    );
};

export default CollectionCard;