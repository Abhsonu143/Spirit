import Footer from "./Footer";
import Navbar from "./Navbar";
import Top from "./Top";
const Layout = ({children}) => {
  return (
    <>
        <Top/>
        <Navbar isuser={false} username={"abhay"}/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout
