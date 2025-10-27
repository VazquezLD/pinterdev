import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const defaultContextValue = {
    photoId: "",
    setPhotoId: () => {},
    addPhotoToCollection: async () => {},
    loading: false,
    error: null,
};

const AddPhotoContext = createContext(defaultContextValue);

export const AddPhotoProvider = ({ children }) => {


    const [photoId, setPhotoId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const addPhotoToCollection = useCallback(async (targetCollectionId) => {
        const token = localStorage.getItem("token");

        if (!token) {
        setError("No hay token de autenticación");
        return;
        }
        if (!photoId) {
        setError("No se ha seleccionado una foto");
        return;
        }
        if (!targetCollectionId) {
        setError("No se ha proporcionado ID de colección");
        return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await axios.patch(
                `https://pinterdev-api.vercel.app/api/colecciones/${targetCollectionId}`,
                { fotoId: photoId },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            console.log(response.data);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || err.message);
        
        } finally {
            setLoading(false);
        }
 
    }, [photoId]);

  return (
    <AddPhotoContext.Provider
      value={{
        photoId,
        setPhotoId,
        addPhotoToCollection,
        loading,
        error, 
      }}
    >
      {children}
    </AddPhotoContext.Provider>
  );
};

export const useAddPhoto = () => useContext(AddPhotoContext);