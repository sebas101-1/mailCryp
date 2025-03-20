import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mailIcon from "../assets/email.svg";
import sendIcon from "../assets/send.svg";
import spamIcon from "../assets/spam.svg";
import importantIcon from "../assets/important.svg";
import logoutIcon from "../assets/logout.svg";
import axios from "axios";

const Sidebar: React.FC<{ onTabChange: (tab: number) => void; currentTab: number}> = ({ onTabChange, currentTab}) => {
    const [hoveredTab, setHoveredTab] = useState<number | null>(null);
    const [isMinimized, setIsMinimized] = useState(true);
    const navigate = useNavigate();

    const toggleIcon = isMinimized
        ? "https://cdn-icons-png.flaticon.com/512/130/130884.png" // Expand icon
        : "https://cdn-icons-png.flaticon.com/512/130/130882.png"; // Minimize icon

    const tabs = [
        { id: 0, icon: mailIcon, label: "Primary" },
        { id: 1, icon: spamIcon, label: "Spam" },
        { id: 2, icon: importantIcon, label: "Important" },
    ];

    const isTabHovered = (tabIndex: number) => hoveredTab === tabIndex || currentTab === tabIndex;

    const renderTab = (id: number, icon: string, label: string) => (
        <button
            key={id}
            onMouseEnter={() => setHoveredTab(id)}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => onTabChange(id)}
            className={`p-4  flex items-center  transition-all ${
                isTabHovered(id) ? "bg-gray-300" : "hover:bg-gray-300"
            }`}
            style={{ width: "100%" }}
        >
            <img className="sm:h-[1.5rem] h-[1rem]" src={icon} alt={`${label} Icon`} />
            {!isMinimized && (
                <p
                    className={`ml-2 transition-all duration-300 ease-in-out`}
                    style={{
                        visibility: isTabHovered(id) ? "visible" : "hidden",
                        opacity: isTabHovered(id) ? "1" : "0",
                        width: "auto",
                        fontSize: isTabHovered(id) ?  "1rem" : "0",
                    }}
                >
                    {label}
                </p>
            )}
        </button>
    );
    function logOut(){
        console.log("logged out");
        axios.post('http://127.0.0.1:3000/logout').then(() => {
              console.log("not Logged In");
              navigate("/");
          })
    }
    return (
        <div
            className="h-full bg-gray-200 transition-all w-auto flex flex-col items-start relative"
            style={{ transition: "width 0.3s ease" }}
        >
            {/* Toggle Minimize Button */}
            <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-4 self-center hidden sm:inline hover:scale-150 transition-all"
            >
                <img className="h-[0.8rem]" src={toggleIcon} alt="Toggle Sidebar" />
            </button>

            {/* Render Tabs */}
            {tabs.map((tab) => renderTab(tab.id, tab.icon, tab.label))}

            {/* Send Tab */}
            <Link
                to="/send"
                onMouseEnter={() => setHoveredTab(3)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`p-4 flex w-full items-center  transition-all ${
                    isTabHovered(3) ? "bg-gray-300" : "hover:bg-gray-300"
                }`}
            >
                <img className="h-[1.5rem]" src={sendIcon} alt="Send Icon" />
                {!isMinimized && (
                    <p
                        className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            visibility: isTabHovered(3) ? "visible" : "hidden",
                            opacity: isTabHovered(3) ? "1" : "0",
                            width: "auto",
                            fontSize: isTabHovered(3)? "1rem" : '0'
                        }}
                    >
                        Send
                    </p>
                )}
            </Link>
            <button
                onMouseEnter={() => setHoveredTab(4)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`p-4 flex w-full items-center  transition-all ${
                    isTabHovered(4) ? "bg-gray-300" : "hover:bg-gray-300"
                }`}
                onClick={logOut}>
                <img className="h-[1.5rem]" src={logoutIcon} alt="Log Out" />
                    {!isMinimized && (
                        <p
                            className="ml-2 overflow-visible transition-all duration-300 ease-in-out"
                            
                            style={{
                                visibility: isTabHovered(4) ? "visible" : "hidden",
                                opacity: isTabHovered(4) ? "1" : "0",
                                width: "auto",
                                fontSize: isTabHovered(4)? "1rem" : '0'
                            }}
                        >
                            Log Out
                        </p>
                    )}
            </button>

            {/* Invisible Spacer for Consistent Width */}
            <div
            className={`p-4  flex invisible items-center w-full  transition-all`}
            style={{ width: "100%" }}
        >
            <img className="sm:h-[1.5rem] h-[1rem]" src={importantIcon} alt={`${importantIcon} Icon`} />
            {!isMinimized && (
                <p
                    className={`ml-2 w-[110%]  transition-all duration-300 ease-in-out`}
                    style={{
                        fontSize: "1rem",
                    }}
                >
                    {"Importantttt"}
                </p>
            )}
        </div>
        </div>
    );
};

export default Sidebar;
