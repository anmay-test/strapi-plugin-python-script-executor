import React, { useState, useContext } from "react";
import Wrapper from "./Wrapper";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import ModalContext from "../../contexts/modalContext";

const FromModal = ({ title, children }) => {
  const { modal, toggleModal, submitFormModal } = useContext(ModalContext);
  const [command, setCommand] = useState("");
  const [params, setParams] = useState("");
  const [scriptName, setScriptName] = useState("");
  const submit = (event) => {
    submitFormModal({
      name: scriptName,
      command: command,
      params: params,
    })
      .then(() => toggleModal())
      .catch((err) => {});
  };

  const handleCommandChange = (event) => {
    setCommand(event.target.value);
  };

  const handleParamsChange = (event) => {
    setParams(event.target.value);
  };

  const handleScriptNameChange = (event) => {
    setScriptName(event.target.value);
  };

  return (
    <Wrapper>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="txtScriptName">Script Name</Label>
                <Input
                  type="text"
                  name="txtScriptName"
                  id="txtScriptName"
                  onChange={handleScriptNameChange}
                  placeholder="Please enter your script name"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="txtCommand">Command</Label>
                <Input
                  type="text"
                  name="txtCommand"
                  id="txtCommand"
                  onChange={handleCommandChange}
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
                  placeholder="Please enter your params"
                  onChange={handleParamsChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="md" onClick={submit}>
            Submit
          </Button>{" "}
          <Button color="secondary" size="md" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Wrapper>
  );
};

FromModal.propTypes = {
  title: PropTypes.string,
};

FromModal.defaultProps = {
  title: "untitled",
};

export default FromModal;
