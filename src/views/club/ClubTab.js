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
import ClubForm from "./ClubForm";
const ClubTab = () => {
    const [activeTab, setActiveTab] = useState("1");
    const tabs = [
        { id: "1", name: "Add", icon: "fas fa-plus-square text-green",visible: false },
    ]
    const actions = [
        { icon: (<i className="fas fa-eye"></i>), path: "/app/club-view", name: "View Club List" },
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
                                <ClubForm /> {/* //Adding Hotel */}
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ClubTab;
