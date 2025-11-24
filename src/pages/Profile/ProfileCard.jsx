import styled from "styled-components";

const ProfileCardStyled = styled.div`
    width: 60vw;
    gap: 10px;
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: left;
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
    @media (max-width: 480px){
        margin-top: 20px;
        align-items: center;
        justify-content: center;
        width: 100%;
        place-content: center;
        & h1{
            font-size: 20px;
        }
        & p{
            font-size: 12px;
            width: 80%;
        }
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