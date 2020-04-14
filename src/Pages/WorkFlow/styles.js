import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    > div {
        margin: 5vh 5vw;
    }
    > button {
        background: none;
        border: 0;
        margin: 10px;
        width: 100px;
        svg {
            width: 100%;
            height: 40px;
        }
    }
`;