export default function cartReducer(cart, action) {
  switch (action.type) {
    case "cart_loaded": {
      return action.cart;
    }

    case "dish_added": {
      const newCart = cart.cartItems.find((dish) => dish.id === action.dish.id);
      if (!newCart) {
        return {
          ...cart,
          cartItems: [...cart.cartItems, { ...action.dish, quantity: 1 }],
        };
      }

      return cart;
    }

    case "quantity_incremented": {
      const maxOrderLimit = 15;

      const updatedQuantityDishes = cart.cartItems.map((dish) =>
        dish.id === action.id
          ? {
              ...dish,
              quantity:
                dish.quantity < maxOrderLimit
                  ? dish.quantity + 1
                  : maxOrderLimit,
            }
          : dish,
      );

      return { ...cart, cartItems: updatedQuantityDishes };
    }

    case "quantity_decremented": {
      const minOrderLimit = 1;

      const updatedQuantityDishes = cart.cartItems
        .filter(
          (dish) => dish.id !== action.id || dish.quantity > minOrderLimit,
        )
        .map((dish) =>
          dish.id === action.id
            ? {
                ...dish,
                quantity: dish.quantity - 1,
              }
            : dish,
        );

      return { ...cart, cartItems: updatedQuantityDishes };
    }

    case "dish_removed": {
      return {
        ...cart,
        cartItems: cart.cartItems.filter((dish) => dish.id !== action.id),
      };
    }

    case "cart_cleared": {
      return { ...cart, cartItems: [] };
    }

    default:
      throw new Error("Unkown action: " + action.type);
  }
}
