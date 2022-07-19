import styles from "../styles/MenuList.module.css";
import MenuListCard from "./MenuListCard";
import Link from "next/link";

const MenuList = ({menuLists}) => {
  return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <Link href="/menu" passHref><span className={styles.menubutton}>Menu</span>
            </Link>
        </div>
        <h1 className={styles.heading}>Our Menu</h1>
        <div className={styles.wrapper}>
            {menuLists.map((list)=>(
                <MenuListCard key={list._id} list={ list }/>
            ))}
        </div>
    </div>
  )
}

export default MenuList;