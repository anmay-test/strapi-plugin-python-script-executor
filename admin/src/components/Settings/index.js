import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import pluginId from "../../pluginId";
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
const EnvironmentSetting = () => (
  <div>
    <h1>Environment Setting Page 1</h1>
    <Row>
      <Col></Col>
    </Row>
  </div>
);

const Settings = ({ settingsBaseURL }) => {
  return (
    <Route
      component={EnvironmentSetting}
      path={`${settingsBaseURL}/${pluginId}/environment`}
    />
  );
};

Settings.propTypes = {
  settingsBaseURL: PropTypes.string.isRequired,
};

export default Settings;
