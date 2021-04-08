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
import RestaurantForm from './RestaurantForm'
import FoodForm from "./FoodForm";
const RestaurantTab = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabs =[
    {id:"1",name:"Add Restaurant",icon:"fas fa-plus-square text-green",visible: true},
    {id:"2",name:"Food Section",icon:"fas fa-plus-square text-green",visible: true},
]
  const actions =[
    {icon:(<i className="fas fa-eye"></i>) ,path:"/app/restaurant-view",name:"View Restaurant List"},
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
              <RestaurantForm /> {/* //Adding Hotel */}   
              </TabPane>
              <TabPane tabId="2">
                <FoodForm/>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RestaurantTab;
