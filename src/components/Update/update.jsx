import React from "react"
import {Link} from "react-router-dom"
import "./update.css"
class Update extends React.Component{
    render(){
        return (
        <div>
            <div className="details-container">
                <div className="content-details">
                    <span className="details-name">
                        Person Details
                    </span>
                    <span className="details-add" >
                    <Link to={{ 
                            pathname:"addperson",
                        aboutProps:{
                            id:"",
                            edit:false
                        }}
                    }
                           >
                    <button className="add">+ Add Person</button></Link>
                    </span>
                    
                </div>
                </div>
            </div>
        )
    }

}
export default Update;