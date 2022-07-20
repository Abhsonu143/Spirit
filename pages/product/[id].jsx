import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import MenuList from "../../components/MenuList";
import Link from "next/link";
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from "react-icons/ai";

const Product = ({item,menuItems}) => {
    const [price,setPrice]=useState(item.prices[0]);
    const [size,setSize]=useState(0);
    const [extras,setExtras]=useState([]);
    const [quantity,setQuantity]=useState(1);
    const dispatch=useDispatch();


    const handleplusminus=(x)=>{
        if(x==="+" && quantity<15)
            setQuantity(quantity+1);
        else if(x==="-" && quantity>1)
            setQuantity(quantity-1);
    }

    const changePrice=(number)=>{
        setPrice(price+number);
    };

    const handleSize=(sizeIndex)=>{
        const difference=item.prices[sizeIndex]-item.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };
    const handleChange=(e,option)=>{
        const checked=e.target.checked;
        if(checked){
            changePrice(option.price);
            setExtras((prev)=>[...prev,option]);
        }
        else{
            changePrice(-option.price);
            setExtras(extras.filter((extra)=>extra._id !==option._id));
        }
    };
    const handleClick=()=>{
        dispatch(addProduct({...item,extras,price,quantity}));
    };
  return (
    <div className={styles.pageContainer}>
        <div className={styles.menu}>
            <Link href="/menu" passHref><span className={styles.menubutton}>Menu</span>
            </Link>
        </div>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={item.img} layout="fill" alt="item"/>
                </div>
            </div>

            <div className={styles.right}>
                <h1 className={styles.title}>{item.title}</h1>
                <span className={styles.price}>₹{price}</span>
                <p className={styles.description}>{item.description}</p>
                <h3 className={styles.choose}>SIZE</h3>
                <span className={styles.sizes}>
                    <div className={styles.size} onClick={()=>handleSize(0)}>
                        <Image src={item.img} layout="fill" alt="size" />
                        <span className={styles.number}>SMALL</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(1)}>
                        <Image src={item.img} layout="fill" alt="size" />
                        <span className={styles.number}>MEDIUM</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(2)}>
                        <Image src={item.img} layout="fill" alt="size" />
                        <span className={styles.number}>LARGE</span>
                    </div>
                </span>
                <h3 className={styles.choose}>Choose Additional Items</h3>
                <div className={styles.ingredients}>
                    {item.extraOptions.map(option=>(
                        <div className={styles.option} key={option._id}>
                        <input
                            type="checkbox"
                            id="double"
                            name="double"
                            className={styles.checkbox}
                            onChange={(e)=>handleChange(e,option)}
                            />
                        <label htmlFor="double">{option.text}</label>
                    </div>
                    ))}
                </div>
                <span className={styles.add}>
                    <span style={{display:"flex"}}>
                        <input value={quantity} min="1" max="15" type="number" className={styles.quantity} disabled/>
                        <span style={{display:"flex"}}>
                            <span className={styles.plusminus} onClick={()=>handleplusminus("+")}><AiOutlinePlusCircle/></span>
                            <span className={styles.plusminus} onClick={()=>handleplusminus("-")}><AiOutlineMinusCircle/></span>
                        </span>
                    </span>
                    <button className={styles.button} onClick={handleClick}>Add to cart</button>
                </span>
            </div>
        </div>
        <MenuList menuLists={menuItems}/>
    </div>
  )
}
export const getServerSideProps=async ({params})=>{
    const res=await axios.get(`https://spirit-one.vercel.app/api/products/${params.id}`);
    const menuItems=await axios.get("https://spirit-one.vercel.app/api/featureds");
    return {
        props:{
            item:res.data,
            menuItems:menuItems.data,
        },
    };
};

export default Product;
