import React, { useReducer, useContext, useState } from "react";
import PropTypes from "prop-types";
import ScriptContext from "../../contexts/scriptsContext";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Card,
  CardBody,
} from "reactstrap";
import Wrapper from "./Wrapper";

const initialState = {};
const reducer = (state, action) => {};

function ScriptConfig({ script, executeCommand }) {
  const [forceUpdate, setForceUpdate] = useState(false);

  return (
    <Wrapper>
      <Card>
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="txtCommand">Script</Label>
                <Input
                  type="text"
                  name="txtCommand"
                  id="txtCommand"
                  defaultValue={script.script}
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
                    command: script.script,
                    params: script.params,
                    id: script.id,
                    isForceUpdate: forceUpdate,
                  });
                }}
              >
                Execute script
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
