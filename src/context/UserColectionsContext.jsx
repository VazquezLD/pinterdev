import { createContext, useContext, useEffect, useState, useCallback } from "react";

const UserCollectionsContext = createContext();

export const UserCollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = useCallback(async () => {
    const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay token de autenticación");
          setLoading(false);
          return;
        }

        try {
        setLoading(true);
        const res = await fetch("https://pinterdev-api.vercel.app/api/colecciones", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setCollections(data.colecciones || []);

            setError(null);
        } catch (err) {
            console.error("Error al obtener colecciones:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

  return (
    <UserCollectionsContext.Provider
      value={{
        collections,
        loading,
        error,
        fetchCollections,
    
      }}
    >
      {children}
    </UserCollectionsContext.Provider>
  );
};

export const useUserCollections = () => useContext(UserCollectionsContext);
