import { NavLink, Outlet } from "react-router-dom";

export default function Residence() {
  return (
    <div className="residence">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "Link active" : "Link"
            }
            to="localaddress"
          >
            Local Address
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "Link active" : "Link"
            }
            to="permanentAddress"
          >
            Permanent Address
          </NavLink>
        </li>
      </ul>

      <div className="child-content">
        <Outlet />
      </div>
    </div>
  );
}