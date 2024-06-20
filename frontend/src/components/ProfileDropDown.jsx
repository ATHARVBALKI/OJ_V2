import { useRef, useState, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [isDashboardHovered, setIsDashboardHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const ref = useRef(null);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check user object and image URL
  useEffect(() => {
    console.log("User object:", user);
    if (user && user.image) {
      console.log("Image URL:", user.image);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-x-1 cursor-pointer" onClick={() => setOpen(!open)}>
        <img
          src={user.image || 'https://via.placeholder.com/30'}
          alt={`profile-${user.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-white" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
        >
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            onMouseEnter={() => setIsDashboardHovered(true)}
            onMouseLeave={() => setIsDashboardHovered(false)}
            className={`block ${isDashboardHovered ? 'bg-[#ff847c]' : 'bg-[#e84a5f]'}`}
          >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            className={`flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white cursor-pointer ${isLogoutHovered ? 'bg-[#ff847c]' : 'bg-[#e84a5f]'}`}
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
