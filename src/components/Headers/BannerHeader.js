import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const BannerHeader = ({actions}) => {
  return (
    <>
      <div
        className="header pb-8 pt-1 pt-lg-7 d-flex align-items-center">
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-7" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col md="12">
              <div className="action">
                {actions.map((action) =>
                  <a
                    className="text-white"
                    href={action.path}
                    // onClick={(e) => e.preventDefault()}
                  >
                  {action.icon}  {action.name}
                  </a>)}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BannerHeader;
