import styled from "styled-components";

const ProfileCardStyled = styled.div`
    width: 60vw;
    height: 200px;
    gap: 10px;
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: left;
    border-bottom: 1px solid #ccc;
    margin-bottom: 50px;

    & p {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px 20px;
        border-radius: 12px;
        backdrop-filter: blur(6px);
        color: #fff;
        font-size: 1rem;
        line-height: 1.6;
        max-width: 900px;
    }
`


export const ProfileCard = () => {
    return(
        <ProfileCardStyled>
            <h1>Bienvenido a tus colecciones!</h1>
            <p>Este contenedor reúne todas tus colecciones en un solo lugar, permitiéndote explorarlas, organizarlas y acceder a cada una de manera rápida y sencilla. Aquí podés gestionar tus categorías, revisar su contenido y continuar trabajando en tus proyectos de forma fluida y ordenada.</p>
        </ProfileCardStyled>
    )
}