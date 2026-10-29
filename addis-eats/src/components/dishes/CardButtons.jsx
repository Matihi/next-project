"use client";
import useCart from "@/context/cart/useCart";

const CardButtons = ({ id, price, nameEn, nameAm, description, image }) => {
  const { cart, dispatch } = useCart();
  const dishForCart = {
    id: id,
    nameEn: nameEn,
    nameAm: nameAm,
    price: price,
    description: description,
    image: image,
    quantity: 0,
  };

  const cartDish = cart.cartItems.find((dish) => dish.id === id);

  const count = cartDish?.quantity ?? 0;

  const handleAddingToCart = () => {
    dispatch({
      type: "dish_added",
      dish: dishForCart,
    });
  };

  const handleIncrement = () => {
    dispatch({
      type: "quantity_incremented",
      id: id,
    });
  };

  const handleDecrement = () => {
    dispatch({
      type: "quantity_decremented",
      id: id,
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "dish_removed",
      id: id,
    });
  };

  return (
    <div className="button-group w-full   mt-0.5">
      {cartDish === undefined ? (
        <button
          className="add-to-cart bg-red-400 px-1 py-0.5 rounded-sm"
          onClick={handleAddingToCart}
        >
          Add to Cart
        </button>
      ) : (
        <div className="count-container grid grid-cols-[1fr_3fr] space-x-0.5">
          <button
            className="remove bg-amber-600 rounded-sm"
            onClick={handleRemove}
          >
            {`X`}
          </button>
          <div className="decCountInc grid grid-cols-[1.3fr_1fr_1.3fr] bg-emerald-400 rounded-sm p-0.5">
            <button
              className="decremen flex justify-center items-center bg-emerald-600 rounded-sm"
              onClick={handleDecrement}
            >
              {"\u2212"}
            </button>
            {count > 0 ? (
              <p className="count flex justify-center items-center">{count}</p>
            ) : (
              <p></p>
            )}
            <button
              className="increment flex justify-center items-center bg-emerald-600 rounded-sm"
              onClick={handleIncrement}
            >
              {"\u002B"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardButtons;
