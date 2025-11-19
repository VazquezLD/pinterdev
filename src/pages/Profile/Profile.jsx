import styled, { keyframes } from "styled-components";
import { useUserCollections } from "../../context/UserColectionsContext";
import Spinner from "../../components/Spinner";
import CollectionCard from "./CollectionCard";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.96); }
`;

const backdropFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const backdropFadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ closing }) => (closing ? backdropFadeOut : backdropFadeIn)} 0.25s ease forwards;
`;

const StyledPopUp = styled.div`
  background-color: #1c1d1f;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  width: 420px;
  padding: 2rem;
  color: white;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  animation: ${({ closing }) => (closing ? fadeOut : fadeIn)} 0.25s ease forwards;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    color: #b0b0b0;
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
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

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 5px;
  color: white;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  background-color: #2a2b2d;
  color: white;
  margin-bottom: 0.8rem;
`;

const ErrorText = styled.div`
  color: #e63946;
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
`;

const Profile = () => {
  const [clicked, setClicked] = useState(false);
  const [closingDelete, setClosingDelete] = useState(false);
  const [closingForm, setClosingForm] = useState(false);
  const [showFormCol, setFormCol] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const { collections, loading, error, fetchCollections } = useUserCollections();
  const { idUSer, token } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");


  const deleteDataCollection = async (id) => {
    if (!token) return;
    try {
      await axios.delete(`https://pinterdev-api.vercel.app/api/colecciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCollections();
      handleCloseDelete();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };


  const addCollection = async (values, { setSubmitting, resetForm }) => {
    if (!token) return;
    try {
      setErrorMessage("");
      await axios.post(
        "https://pinterdev-api.vercel.app/api/colecciones",
        {
          titulo: values.titulo,
          descripcion: values.descripcion,
          usuarioId: idUSer,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      resetForm();
      handleCloseForm();
      await fetchCollections();
    } catch (error) {
      console.error("Error al crear colección:", error);
      if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Error desconocido al crear la colección.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseDelete = () => {
    setClosingDelete(true);
    setTimeout(() => {
      setClicked(false);
      setClosingDelete(false);
    }, 250);
  };

  const handleCloseForm = () => {
    setClosingForm(true);
    setTimeout(() => {
      setFormCol(false);
      setClosingForm(false);
    }, 250);
  };

  const validationSchema = Yup.object().shape({
    titulo: Yup.string()
      .required("El título es obligatorio")
      .max(50, "Máximo 50 caracteres"),
    descripcion: Yup.string()
      .required("La descripcion es obligatoria")
      .max(200, "Máximo 200 caracteres"),
  });

  if (loading) return <Spinner />;
  if (error) return <div>Error al cargar: {error}</div>;

  return (
    <>
      <h2>Tus Colecciones 📂</h2>
      <ButtonContainer>
        <Button onClick={() => setFormCol(true)}>Agregar colección</Button>
      </ButtonContainer>

      <PhotoGrid>
        {Array.isArray(collections) && collections.length > 0 ? (
          collections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              setClicked={setClicked}
              setIdToDelete={setIdToDelete}
            />
          ))
        ) : (
          <p>No tienes colecciones aún.</p>
        )}
      </PhotoGrid>

      {clicked && (
        <Overlay closing={closingDelete}>
          <StyledPopUp closing={closingDelete}>
            <h3>¿Eliminar colección?</h3>
            <div className="buttons">
              <Button onClick={handleCloseDelete}>Cancelar</Button>
              <Button
                variant="danger"
                onClick={() => deleteDataCollection(idToDelete)}
              >
                Eliminar
              </Button>
            </div>
          </StyledPopUp>
        </Overlay>
      )}

      {showFormCol && (
        <Overlay $closing={closingForm}>
          <StyledPopUp $closing={closingForm}>
            <h3>Nueva colección</h3>
            <Formik
              initialValues={{ titulo: "", descripcion: "" }}
              validationSchema={validationSchema}
              onSubmit={addCollection}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Input name="titulo" placeholder="Título" />
                  <ErrorMessage name="titulo" component={ErrorText} />

                  <Field
                    name="descripcion"
                    as="textarea"
                    rows="3"
                    placeholder="Descripción"
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      backgroundColor: "#2a2b2d",
                      color: "white",
                      marginBottom: "0.8rem",
                      border: "none"
                    }}
                  />
                  <ErrorMessage name="descripcion" component={ErrorText} />

                  {errorMessage && (
                    <p style={{ color: "#e63946", fontSize: "0.9rem" }}>
                      {errorMessage}
                    </p>
                  )}

                  <div className="buttons" style={{ marginTop: "1rem" }}>
                    <Button type="button" onClick={handleCloseForm}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      Crear
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </StyledPopUp>
        </Overlay>
      )}
    </>
  );
};

export default Profile;
