import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const NoActionBanner = () => {
  return (
    <>
      <div
        className="header pb-2 pt-1 pt-lg-7 d-flex align-items-center">
        <span className="mask bg-gradient-default opacity-7" />
        {/* <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col md="12">
              <div className="action">
              </div>
            </Col>
          </Row>
        </Container> */}
      </div>
    </>
  );
};

export default NoActionBanner;
