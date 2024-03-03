import { Button, Card } from "react-bootstrap";
import { format } from "../utilities/format";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromcart,
  getItemQuantity,
} from "../features/cartSlice";
import { useState } from "react";

interface storeItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const StoreItem = ({ id, name, price, imgUrl }: storeItemProps) => {
  const [productId, setProductId] = useState(0);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart);

  const ItemQuantity = async (id: number) => {
    await dispatch(getItemQuantity(id));
    setProductId(id);
  };
  let quantity = cartProducts.find((item) => item.id === productId)?.quantity || 0;

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{format(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <>
              <Button
                className="w-100"
                onClick={() => {
                  ItemQuantity(id), dispatch(increaseCartQuantity(id));
                }}
              >
                Add to Cart
              </Button>
            </>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={() => {
                    ItemQuantity(id), dispatch(decreaseCartQuantity(id));
                  }}
                >
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <Button
                  onClick={() => {
                    ItemQuantity(id), dispatch(increaseCartQuantity(id));
                  }}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  ItemQuantity(id), dispatch(removeFromcart(id));
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
