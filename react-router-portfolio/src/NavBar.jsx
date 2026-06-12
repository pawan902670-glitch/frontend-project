import { NavLink, Outlet } from "react-router-dom"
import "./App.css";
export default function NavBar(){
    return (
        <div>
        <div className="header">
            <ul>
                <li><NavLink className="Link" to="/">Home</NavLink></li>
                <li>
                    <NavLink className="Link" to="/detailes">Detailes</NavLink>
                </li>
                <li>
                    <NavLink className="Link" to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink className="Link" to="/studentDetails">Student Detailes</NavLink>
                </li>
                <li>
                    <NavLink className="Link" to="/residence">Residence</NavLink>
                </li>
            </ul>
            </div>
            <Outlet />
        </div>
    )
}