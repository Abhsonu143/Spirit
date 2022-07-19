import styles from "../styles/Add.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Add = ({setClose,featuredItems}) => {
    const [file,setFile]=useState(null);
    const [title,setTitle]=useState(null);
    const [model,setModel]=useState("");
    const [description,setDescription]=useState(null);
    const [prices,setPrices]=useState([]);
    const [extraOptions,setExtraOptions]=useState([]);
    const [extra,setExtra]=useState(null);

    const changePrice=(e,index)=>{
        const currentPrices=prices;
        currentPrices[index]=e.target.value;
        setPrices(currentPrices);
    };

    const handleExtraInput =(e)=>{
        setExtra({...extra,[e.target.name]:e.target.value});
    };

    const handleExtra=(e)=>{
        setExtraOptions((prev)=>[...prev,extra]);
    };

    const handleCreate=async()=>{
        const data=new FormData();
        data.append("file",file);
        data.append("upload_preset","uploads");
        try{
            const uploadRes=await axios.post("https://api.cloudinary.com/v1_1/abhaysonu/image/upload",
            data);
            const {url}=uploadRes.data;
            const newProduct={
                title,
                description,
                prices,
                extraOptions,
                img:url,
            };
            await axios.post(`http://localhost:3000/api/products/${model}`,newProduct);
            setClose(true);
        }catch(err){
            console.log(err);
            alert("please enter details properly");
        }
    };

    const handleButton=()=>{
        setModel(event.target.name);
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={()=>setClose(true)} className={styles.close}>
                X
            </span>
            <h1>Add a new Product</h1> 
            <div className={styles.selectItem}>
                <div className={styles.selectProduct}>select a below listed product:</div>
                <div className={styles.wrapperList}>
                    {featuredItems.map((lists)=>(
                        <button name={lists.title} className={styles.modelName} key={lists._id} onClick={handleButton}>{lists.title}</button>
                    ))}
                </div>
                <div className={styles.addItem}>You are adding <h3 className={styles.selectedType}>{model==""?<p>general</p>:<p>{model}</p>}</h3> item to menu</div>
            </div>

            
            <div className={styles.item}>
                <label className={styles.label}>Choose an image</label>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Title</label>
                <input type="text"
                    className={styles.input}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Description</label>
                <textarea
                    type="file"
                    rows={4}
                    onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Prices</label>
                <div className={styles.priceContainer}>
                    <input 
                        type="number"
                        placeholder="Small"
                        onChange={(e)=>changePrice(e,0)}
                        className={`${styles.input} ${styles.inputSm}`}
                    />
                    <input 
                        type="number"
                        placeholder="Medium"
                        onChange={(e)=>changePrice(e,1)}
                        className={`${styles.input} ${styles.inputSm}`}
                    />
                    <input 
                        type="number"
                        placeholder="Large"
                        onChange={(e)=>changePrice(e,2)}
                        className={`${styles.input} ${styles.inputSm}`}
                    />
                </div>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Extra</label>
                <div className={styles.extra}>
                    <input 
                        type="text"
                        placeholder="Item"
                        name="text"
                        onChange={handleExtraInput}
                        className={`${styles.input} ${styles.inputSm}`}
                    />
                    <input 
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={handleExtraInput}
                        className={`${styles.input} ${styles.inputSm}`}
                    />
                    <button className={styles.extraButton} onClick={handleExtra}>
                        Add
                    </button>
                </div>
                <div className={styles.extraItems}>
                    {extraOptions.map((option)=>(
                        <span key={option.text} className={styles.extraItem}>
                            {option.text}
                        </span>
                    ))}
                </div>
            </div>
            <button className={styles.addButton} onClick={handleCreate}>
                Create
            </button>
        </div>
    </div>
  );
};


export default Add;