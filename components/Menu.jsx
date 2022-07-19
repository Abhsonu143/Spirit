import styles from "../styles/Menu.module.css";
import MenuCard from "./MenuCard"
const Menu = ({menuItems}) => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            {menuItems.map((item)=>(
              <MenuCard key={item._id} item={item}/>
            ))}
        </div>
    </div>
  )
}

export default Menu;