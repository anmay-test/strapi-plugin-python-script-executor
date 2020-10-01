import React, { useReducer, useContext, useState } from "react";
import { request } from "strapi-helper-plugin";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ScriptContext from "../../contexts/scriptsContext";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
  Card,
  CardBody,
} from "reactstrap";
import pluginId from "../../pluginId";
import Wrapper from "./Wrapper";

const initialState = {};
const reducer = (state, action) => {};

function ScriptConfig({ script, executeCommand }) {
  const { selectedId, socket } = useContext(ScriptContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [forceUpdate, setForceUpdate] = useState(false);

  return (
    <Wrapper>
      <Card>
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="txtCommand">Command</Label>
                <Input
                  type="text"
                  name="txtCommand"
                  id="txtCommand"
                  defaultValue={script.command}
                  readOnly="readonly"
                  placeholder="Please enter your command"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="txtParams">Params</Label>
                <Input
                  type="text"
                  name="txtParams"
                  id="txtParams"
                  defaultValue={script.params}
                  readOnly="readonly"
                  placeholder="Please enter your params"
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <br />
                <div>
                  <CustomInput
                    type="checkbox"
                    id="chkForceUpdate"
                    label="Force Update"
                    checked={forceUpdate}
                    onChange={() => setForceUpdate(!forceUpdate)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                color="primary"
                size="md"
                onClick={() => {
                  executeCommand({
                    command: script.command,
                    params: script.params,
                    id: script.id,
                    isForceUpdate: forceUpdate,
                  });
                }}
              >
                Execute Command
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Wrapper>
  );
}

ScriptConfig.propTypes = {
  script: PropTypes.object.isRequired,
  executeCommand: PropTypes.func,
};

ScriptConfig.defaultProps = {
  script: {
    command: "",
    params: "",
  },
};

export default ScriptConfig;
