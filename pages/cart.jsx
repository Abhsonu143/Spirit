import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open,setOpen]=useState(false);
  const [cash,setCash]=useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router=useRouter();

  const createOrder=async (data)=>{
    try{
      const res=await axios.post("http://spirit-one.vercel.app/api/orders",data);
      if(res.status === 201) {
          dispatch(reset());
          router.push(`/orders/${res.data._id}`);
      }
    }catch(err){
      console.log(err);
    }
  }
  // This values are the props in the UI

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping=details.purchase_units[0].shipping;
              createOrder({
                customer:shipping.name.full_name,
                address:shipping.address.address_line_1,
                total:cart.total,
                method:1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Prices</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>

          {cart.products.map((product) => (
            <tr className={styles.tr} key={product._id}>
              <Link href={`/product/${product._id}`} passHref>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.img}
                    layout="fill"
                    alt="product"
                    className={styles.image}
                  />
                </div>
              </Link>
              <td>
                <Link href={`/product/${product._id}`} passHref className={styles.name}><span className={styles.name_text}>{product.title}</span></Link>
              </td>
              <td>
                <span className={styles.extras}>
                  {product.extras.map((extra) => (
                    <span key={extra._id}>{extra.text}, </span>
                    ))}
                </span>
              </td>
              <td>
                <span className={styles.price}>₹{product.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{product.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>
                  ₹{product.price * product.quantity}
                </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>₹{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>₹
            {Math.floor(cart.total * 0.1)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>₹
            {Math.ceil(cart.total * 0.9)}
          </div>
          {open?(
            <div className={styles.paymentMenthods}>
              <button className={styles.payButton} onClick={()=>setCash(true)}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
              options={{
              "client-id": "AaChodVOd0ROVAPMeFcgoMEdrtZFwL_ZrEB6uuOcI03AmKSSvPEgiIMmmdDAUVkR5XhCVyQC6218Ml1M",
              components: "buttons",
              currency: "USD",
              "disable-funding":"credit,card,p24",
              }}
              >
              <ButtonWrapper currency={currency} showSpinner={false}/>
              </PayPalScriptProvider>
            </div>
          ):(
            <button className={styles.button} onClick={()=>setOpen(true)}>BUY NOW!</button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
