import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import NavBar from "./NavBar"
import Detailes from "./Detailes";
import Contact from "./Contact";
import PageNotfound from "./PageNotfound";
import StudentDetailes from "./StudentDetailes";
import Residence from "./Residence";
import LocalAddress from "./LocalAddress";
import PermanentAddress from "./PermanentAddress";
export default function App() {
    return (
        <Routes>
            <Route element={<NavBar />}>
                <Route path="/" element={<Home />} />
                <Route path="/detailes" element={<Detailes />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/*" element={<PageNotfound />} />

                <Route path="/studentDetails" element={<StudentDetailes />} />
            </Route>
            <Route path="/residence" element={<Residence />}>
                <Route path="localaddress" element={<LocalAddress />} />
                <Route path="permanentAddress" element={<PermanentAddress />} />
            </Route>
        </Routes>
    )
}
