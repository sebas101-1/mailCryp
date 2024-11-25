import { Link } from "react-router-dom";
import notFound from "../assets/200.webp";

export default function NotFound() {
    let delay;
    let duration;
    return (
        <div className="h-full bg-black">
            {/* Scrolling containers with duplicated text for seamless scrolling */}

            {[...Array(6)].map((_, index) => (
                <div key={index} className="scrolling-container">
                    <Link to='/'>
                    {delay = Math.random() * 40}
                    {duration =Math.random() * 10 + 10}
                    <p
                        style={{
                            animationDelay: `${delay}ms`,
                            animationDuration: `${duration}s`,
                        }}
                        className="scrolling-text"
                    >
                        404 Not Found
                    </p>
                    <p
                        style={{
                            animationDelay: `${delay}ms`,
                            animationDuration: `${duration}s`,
                        }}
                        className="scrolling-text"
                    >
                        404 Not Found
                    </p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
