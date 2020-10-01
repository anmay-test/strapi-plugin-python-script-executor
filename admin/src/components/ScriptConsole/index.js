import React, { useContext } from "react";
import PropTypes from "prop-types";
import ScriptContext from "../../contexts/scriptsContext";
import Wrapper from "./Wrapper";
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
import FromModal from "../../containers/FormModal";
function ScriptConsole({ script, consoleResult }) {
  const { selectedIndex } = useContext(ScriptContext);
  return (
    <Wrapper>
      <Card>
        <CardBody>
          <FormGroup>
            <Label for="console">Console output</Label>
            <Input
              type="textarea"
              name="console"
              id="console"
              defaultValue={consoleResult}
              readOnly="{true}"
            />
          </FormGroup>
        </CardBody>
      </Card>
    </Wrapper>
  );
}

ScriptConsole.propTypes = {
  script: PropTypes.object.isRequired,
};

ScriptConsole.defaultProps = {
  script: {},
};

export default ScriptConsole;
