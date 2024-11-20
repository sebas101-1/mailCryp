import React, { useState } from 'react';
import mailIcon from '../assets/email.svg';

const Sidebar: React.FC<{ onTabChange: (tab: number) => void; currentTab: number; open: string }> = ({ onTabChange, currentTab, open }) => {
    const [hoveredTab, setHoveredTab] = useState<number | null>(null);
    const [isMinimized, setIsMinimized] = useState(false);

    const spamIcon = "https://static.thenounproject.com/png/3951320-512.png";
    const importantIcon = "https://www.svgrepo.com/show/309695/important.svg";
    const toggleIcon = isMinimized
        ? "https://cdn-icons-png.flaticon.com/512/130/130882.png" // Expand icon
        : "https://cdn-icons-png.flaticon.com/512/130/130884.png"; // Minimize icon

    const isTabHovered = (tabIndex: number) => hoveredTab === tabIndex || currentTab === tabIndex;

    return (
        <div
            className={`h-full bg-gray-200 flex flex-col items-start p-4 transition-all`}
            style={{
                width: isMinimized ? '100px' : '200px',
                transition: 'width 0.3s ease',
            }}
        >
            {/* Toggle Minimize Button */}
            <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="mb-4 p-2 self-end hover:bg-gray-300 rounded-full transition-all"
            >
                <img className="h-[1.2rem]" src={toggleIcon} alt="Toggle Sidebar" />
            </button>

            {/* Tab 0 */}
            <button
                onMouseEnter={() => setHoveredTab(0)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => onTabChange(0)}
                className={`p-4 mb-4 flex items-center rounded-full transition-all ${
                    isTabHovered(0) ? 'bg-gray-300' : 'hover:bg-gray-300'
                }`}
                style={{
                    width: isMinimized ? '100%' : 'auto',
                }}
            >
                <img className="h-[1.2rem]" src={mailIcon} alt="Mail Icon" />
                {!isMinimized && (
                    <p
                        className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxWidth: isTabHovered(0)&&!isMinimized ? '100px' : '0',
                            opacity: isTabHovered(0)&&!isMinimized ? '100%' : '0',
                            fontSize: isTabHovered(0)&&!isMinimized ? '1rem' : '0rem',
                        }}
                    >
                        Primary
                    </p>
                )}
            </button>

            {/* Tab 1 */}
            <button
                onMouseEnter={() => setHoveredTab(1)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => onTabChange(1)}
                className={`p-4 mb-4 flex items-center rounded-full transition-all ${
                    isTabHovered(1) ? 'bg-gray-300' : 'hover:bg-gray-300'
                }`}
                style={{
                    width: isMinimized ? '100%' : 'auto',
                }}
            >
                <img className="h-[1.5rem]" src={spamIcon} alt="Spam Icon" />
                {!isMinimized && (
                    <p
                        className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxWidth: (isTabHovered(1)&&!isMinimized) ? '100px' : '0',
                            opacity: isTabHovered(1)&&!isMinimized ? '100%' : '0',
                            fontSize: isTabHovered(1)&&!isMinimized ? '0.8rem' : '0rem',
                        }}
                    >
                        Spam
                    </p>
                )}
            </button>

            {/* Tab 2 */}
            <button
                onMouseEnter={() => setHoveredTab(2)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => onTabChange(2)}
                className={`p-4 flex mb-4 items-center rounded-full transition-all ${
                    isTabHovered(2) ? 'bg-gray-300' : 'hover:bg-gray-300'
                }`}
                style={{
                    width: isMinimized ? '100%' : 'auto',
                }}
            >
                <img className="h-[1.5rem]" src={importantIcon} alt="Important Icon" />
                {!isMinimized && (
                    <p
                        className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxWidth: isTabHovered(2)&&!isMinimized ? '100px' : '0',
                            opacity: isTabHovered(2)&&!isMinimized ? '100%' : '0',
                            fontSize: isTabHovered(2)&&!isMinimized ? '0.8rem' : '0rem',
                        }}
                    >
                        Important
                    </p>
                )}
            </button>
        </div>
    );
};

export default Sidebar;
