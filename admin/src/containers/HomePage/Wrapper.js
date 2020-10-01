import styled, { css } from "styled-components";
import { colors, sizes } from "strapi-helper-plugin";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - ${sizes.header.height});
  font-size: 1.5rem;
  // padding-top: 3.1rem;
  // padding-left: 2rem;
  // padding-right: 2rem;
  display: flex;
  flex-direction: row;
  input,
  textarea {
    font-size: 1.5rem;
  }
  button {
    padding: 5px 15px;
  }
  .left-side-bar {
    padding-top: 1.5rem;
    background-color: ${colors.leftMenu.mediumGrey};
    width: 25%;
    li a {
      color: #2d3138;
    }
    .add-new-script {
      text-align: center;
    }
  }
  .main-content {
    width: 75%;
    padding: 1em;
    background-color: ${colors.lightGrey};
  }
`;

export { Wrapper };
