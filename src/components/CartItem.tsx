import { useAppDispatch } from "../hooks/hook";
import { removeFromcart } from "../features/cartSlice";
import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { format } from "../utilities/format";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: "0.75rem" }}>
        {format(item.price)}
      </div>
      <div>{format(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => dispatch(removeFromcart(item.id))}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
