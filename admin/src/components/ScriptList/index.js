import React, { useState, useEffect, useReducer, useContext } from "react";
import { Wrapper } from "./Wrapper";
import PropTypes from "prop-types";
import { Row, Col, Button } from "reactstrap";
import ScriptContext from "../../contexts/scriptsContext";
import ModalContext from "../../contexts/modalContext";

function ScriptList({ scripts, isShowAdd }) {
  const { selectedId, selectScript } = useContext(ScriptContext);
  const { toggleModal } = useContext(ModalContext);

  return (
    <Wrapper>
      <Row>
        <Col>
          <ul>
            {scripts.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className={selectedId === item.id ? "active" : "non-active"}
                  onClick={() => selectScript(item.id)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      {isShowAdd ? (
        <Row>
          <Col>
            <div className="add-new-script">
              <Button color="link" onClick={toggleModal}>
                Add new script
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </Wrapper>
  );
}

ScriptList.defaultProps = {
  scripts: [],
};

ScriptList.propType = {
  scripts: PropTypes.array,
};

export default ScriptList;
