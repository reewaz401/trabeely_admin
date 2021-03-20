import React, { useContext } from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

import { AuthContext } from '../../contexts/UserAuthentication'
const UserHeader = () => {
  const {  authUser } = useContext(AuthContext)

  return (
    <>
      <div
        className="header pb-8 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundImage:
            `url(${process.env.PUBLIC_URL}/res/img/logo7.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h4 className="text-white">Currently loged in: {authUser.email}</h4>
              <p className="text-white mt-0"></p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
