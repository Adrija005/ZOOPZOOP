import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
  // Access the cart dispatch function and current cart state using custom hooks
  let dispatch = useDispatchCart();
  let data = useCart();

  // Create a ref to hold the reference to the price select element
  const priceRef = useRef();

  // Extract options and priceOptions from props
  let options = props.options;
  let priceOptions = Object.keys(options);

  // Set initial state for quantity and size using useState
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // Calculate the finalPrice based on the selected size and quantity
  let finalPrice = qty * parseInt(options[size]);

  // useEffect to update the size state when the priceRef changes
  useEffect(() => {
    setSize(priceRef.current.value);
  }, [priceRef]);

  // Handle the addition of the item to the cart
  const handleAddToCart = async () => {
    // Dispatch an action to add the item to the cart with relevant details
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // Log the current cart data to the console
    console.log(data);
  };

  // JSX structure for rendering the card component
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "340px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            {/* Quantity dropdown */}
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(event) => setQty(event.target.value)}
            >
              {Array.from(Array(6), (element, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            {/* Size dropdown */}
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={(event) => setSize(event.target.value)}
            >
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>

            {/* Display the final price */}
            <div className="d-inline h-100 fs-5">Rs.{finalPrice}/-</div>
          </div>
          <hr></hr>
          {/* Button to add the item to the cart */}
          <button
            className={`btn btn-primary justify-center ms-2`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
