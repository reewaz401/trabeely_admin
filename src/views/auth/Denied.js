import React, { useContext } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Col,
} from "reactstrap";
const Denied = () => {
  
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-2">
           <h1>Permission Denied</h1>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Denied;
