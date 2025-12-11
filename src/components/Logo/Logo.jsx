import React from 'react';
import { Link } from 'react-router';
import { FaPaintRoller } from "react-icons/fa";

const Logo = () => {
    return (
        <Link to='/' className="flex items-center gap-2 group">
            {/* Icon with Primary Gold Color */}
            <FaPaintRoller className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300 drop-shadow-sm" />

            <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors duration-300">
                    Style<span className="text-primary">Decor</span>
                </span>
            </div>
        </Link>
    );
};

export default Logo;