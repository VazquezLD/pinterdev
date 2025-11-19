import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhotoCard from '../../components/PhotoCard';
import Spinner from '../../components/Spinner';
import SearchBar from '../../components/SearchBar';
import CollectionsPopUp from '../../components/CollectionsPopUp';
import CategoryBar from './TopicBar';

const PhotoGrid = styled.div`
  column-count: 4;
  column-gap: 1rem;
  width: 100%;
  margin-top: 40px;
  
  @media (max-width: 1200px) { column-count: 3; }
  @media (max-width: 768px) { column-count: 2; }
  @media (max-width: 480px) { column-count: 1; }
`;
const ContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const HomePage = () => {
  
  const [showPopup, setShowPopup] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 

  const fetchPhotos = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const isSearching = searchQuery.trim() !== '';
    const endpoint = isSearching ? 'https://api.unsplash.com/search/photos' : 'https://api.unsplash.com/photos';
    const params = {
      page: page,
      per_page: 20,
    };
    if (isSearching) {
      params.query = searchQuery;
    } else {
      params.order_by = 'latest';
    }

    try {
      const accessKey = 'HSk-TwxnSZsDrnRdsNu1KPGHsZMwQz1Hay_h6_J95go';
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Client-ID ${accessKey}` },
        params: params,
      });
      
      const newPhotos = isSearching ? response.data.results : response.data;
      setPhotos(prevPhotos => {
        const allPhotos = page === 1 ? newPhotos : [...prevPhotos, ...newPhotos];
        const uniquePhotos = Array.from(new Map(allPhotos.map(p => [p.id, p])).values());
        return uniquePhotos;
      });

    } catch (err) {
      setError('Error al cargar las imágenes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, loading]); 


  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        setPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    fetchPhotos();
  }, [page, searchQuery]);

 
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setPhotos([]);
  };

  return (
    <>
      <ContainerStyled>
        <SearchBar onSearch={handleSearch} />
        <CategoryBar/>
      </ContainerStyled>
      {loading && photos.length === 0 && <Spinner />}
      {error && <p style={{ textAlign: 'center' }}>{error}</p>}

      <PhotoGrid>
        {photos.map(photo => (<PhotoCard key={photo.id} photo={photo} setShowPopup={setShowPopup}/>))}
        {showPopup && (<CollectionsPopUp onClose={() => setShowPopup(false)} />)}
      </PhotoGrid>

      {loading && photos.length > 0 && <Spinner />}
    </>
  );
};

export default HomePage;