import { Offcanvas, Stack } from "react-bootstrap";
import { useAppSelector } from "../hooks/hook";
import CartItem from "./CartItem";
import { format } from "../utilities/format";
import storeItems from "../data/items.json";

interface shoppingCartProps {
  isOpen: boolean;
  setIsOpenb: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ShoppingCart = ({ isOpen, setIsOpenb }: shoppingCartProps) => {
  const cartProducts = useAppSelector((state) => state.cart);
  return (
    <Offcanvas show={isOpen} onHide={() => setIsOpenb(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartProducts.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {format(
              cartProducts.reduce((total, cartItems) => {
                const item = storeItems.find((i) => i.id === cartItems.id);
                return total + (item?.price || 0) * cartItems.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
