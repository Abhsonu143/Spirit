import axios from "axios";
import Image from "next/image";
import styles from "../../styles/Order.module.css";

const Order = ({order}) => {
    const status=order.status;
    const statusClass=(index)=>{
        if(index-status<1) return styles.done;
        if(index-status==1) return styles.inProgress;
        if(index-status>1) return styles.undone;
    }
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
              <table className={styles.table}>
                <tbody>
                  <tr className={styles.trTitle}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                  </tr>
                </tbody>
                <tbody>
                  <tr className={styles.tr}>
                    <td>
                      <span className={styles.id}>{order._id}</span>
                    </td>
                    <td>
                      <span className={styles.name}>{order.customer}
                      </span>
                    </td>
                    <td>
                      <span className={styles.address}>{order.address}</span>
                    </td>
                    <td>
                      <span className={styles.total}>{order.total}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.row}>
                <div className={statusClass(0)}>
                    <Image src="/images/orders/paid.png" width={30} height={30} alt="paid"/>
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image className={styles.checkedIcon} src="/images/orders/checked.png" alt="done" width="20" height="20" />
                    </div>
                </div>
                <div className={statusClass(1)}>
                    <Image src="/images/orders/bake.png" width={30} height={30} alt="paid"/>
                    <span>Preparing</span>
                    <div className={styles.checkedIcon}>
                        <Image className={styles.checkedIcon} src="/images/orders/checked.png" alt="done" width="20" height="20" />
                    </div>
                </div>
                <div className={statusClass(2)}>
                    <Image src="/images/orders/bike.png" width={30} height={30} alt="paid"/>
                    <span>On the way</span>
                    <div className={styles.checkedIcon}>
                        <Image className={styles.checkedIcon} src="/images/orders/checked.png" alt="done" width="20" height="20" />
                    </div>
                </div>
                <div className={statusClass(3)}>
                    <Image src="/images/orders/delivered.png" width={30} height={30} alt="paid"/>
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image className={styles.checkedIcon} src="/images/orders/checked.png" alt="done" width="20" height="20" />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>₹{order.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>₹{Math.ceil(order.total*0.1)}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>₹{Math.ceil(order.total*0.9)}
            </div>
            <button disabled className={styles.button}>PAID</button>
          </div>
        </div>
    </div>
  )
}
export const getServerSideProps=async ({params})=>{
  const res=await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props:{ order:res.data}
  };
};

export default Order;