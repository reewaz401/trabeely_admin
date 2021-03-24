import React, { useState } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  CardBody,
  Card,
} from "reactstrap";

import BannerHeader from "components/Headers/BannerHeader";
import TabArea from "views/TabArea";
import PackageForm from "./PackageForm";
import ItineraryForm from "./ItineraryForm";
const PackageTab = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [packageId, setPackageId] = useState('');

  const tabs = [
    { id: "1", name: "Package Information", icon: "fas fa-plus-square text-green", visible: true },
    { id: "2", name: "Itinerary", icon: "fas fa-edit text-green", visible: true }
  ]
  const actions = [
    { icon: (<i class="fas fa-eye"></i>), path: "/app/package-view", name: "View Package List" },
  ]
  return (
    <>
      <BannerHeader actions={actions} />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <Row>
          <Col className="nav-item order-xl-1" xl="12">
            <TabArea tabss={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <PackageForm activeTab={activeTab} setActiveTab={setActiveTab} setPackageId={setPackageId} />
              </TabPane>
              {packageId !== "" ?
                <TabPane tabId="2">
                  <ItineraryForm activeTab={activeTab} setActiveTab={setActiveTab} packageId={packageId} />
                </TabPane> : (
                  <Card className="bg-secondary shadow mb-4">
                    <CardBody>
                      <h4>To add itinerary please first add your required package.</h4>
                    </CardBody></Card>
                )}
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PackageTab;
