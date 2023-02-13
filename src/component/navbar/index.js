import React, { Fragment } from "react";
import { Navbar, NavbarBrand, Nav, NavLink, Row, Col } from "reactstrap";
import { MdKeyboardArrowLeft } from "react-icons/md"
const Header = () => {
    return (

        <>
            <Navbar
                className=" bg-nav"

            >
                <Row className="w-100 d-flex">
                    <Col lg="12" className="d-flex">
                        <NavbarBrand >
                            <h3 className="text-white"> <span><MdKeyboardArrowLeft size={45} color="white" /></span>View Audience</h3>
                        </NavbarBrand>

                    </Col>
                </Row>


            </Navbar>
        </>

    )
}
export default Header;