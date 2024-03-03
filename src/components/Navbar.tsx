import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/hook";
import { ShoppingCart } from "./ShoppingCart";
import { useState } from "react";

export const Navbar = () => {
  const cartProducts = useAppSelector((state) => state.cart);
  let itemQty = cartProducts.reduce((cur, acc) => acc.quantity + cur, 0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to={"/"}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/store"}>
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/about"}>
            About
          </Nav.Link>
        </Nav>
        {itemQty > 0 && (
          <Button
            onClick={() => setIsOpen(true)}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-secondary"
            className="rounded-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div
              className="rounded-circle bg-info d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {itemQty}
            </div>
          </Button>
        )}
      </Container>
      <ShoppingCart isOpen={isOpen} setIsOpenb={setIsOpen} />
    </NavbarBs>
  );
};
