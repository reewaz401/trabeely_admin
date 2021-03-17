import React, { useState } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
} from "reactstrap";

import BannerHeader from "components/Headers/BannerHeader";
import TabArea from "views/TabArea";
import PackageForm from "./PackageForm";
import ItineraryForm from "./ItineraryForm";
const PackageTab = () => {
  const [activeTab, setActiveTab] = useState('1');

  const tabs =[
    {id:"1",name:"Package Information",icon:"fas fa-plus-square text-green"},
    {id:"2",name:"Itinerary",icon:"fas fa-edit text-green"}
]
  const actions =[
    {icon:(<i class="fas fa-eye"></i>) ,path:"/app/package-view",name:"View Package List"},
]
  return (
    <>
      <BannerHeader actions={actions} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="nav-item order-xl-1" xl="12">
            <TabArea tabss={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
              <PackageForm /> {/* //Adding Package */}   
              </TabPane>
              <TabPane tabId="2">
                <ItineraryForm/>
              </TabPane>
             
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PackageTab;
