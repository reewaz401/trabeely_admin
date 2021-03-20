import React from 'react'
import { Nav, NavLink, NavItem, } from "reactstrap";
import classnames from 'classnames'
function TabArea({ tabss, setActiveTab, activeTab }) {
    const toggle = tab => {

        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }
    return (
        <>
            <Nav tabs>
                {tabss.map((tab, index) => (
                    tab.visible ? (
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === tab.id })}
                                onClick={() => toggle(tab.id)}
                            >
                                <i className={tab.icon}></i> {tab.name}
                            </NavLink>
                        </NavItem>
                    ) : ""

                ))}
            </Nav>
        </>
    )
}

export default TabArea
