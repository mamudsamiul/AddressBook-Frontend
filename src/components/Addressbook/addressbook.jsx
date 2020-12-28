import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "H:/React App/addressbook-frontend/src/assets/logo.jpg"
import "./addressbook.css"
import AllAddress from "../allAddress/alladdress"
import Update from "../../components/Update/update"
import Index from "../index/index"
class Addressbook extends React.Component{
render(params){
    return(
        <div className="main-menu">
            <ToastContainer />
            <div className="addressbook-main">
                <header className="header">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <div>
                            <span className="address-text">ADDRESS</span> <br />
                            <span className="address-text address-book">BOOK</span>
                        </div>
                    </div>
                </header>     
            </div>
            <div>
            <Update/>
            <Index/>
            </div>
            <div>
            <AllAddress/>
            </div>
        </div>
    )
}
}
export default Addressbook;
