// import React from 'react';

// const LoadingSpinner = () => {
//     return (
//         <div className="flex justify-center items-center h-screen bg-white">
//             <span className="loading loading-spinner text-primary loading-lg"></span>
//         </div>
//     );
// };

// export default LoadingSpinner;


import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable and accessible loading spinner component.
 *
 * It defaults to a full-screen, semi-transparent overlay to indicate
 * a global loading state, but can be configured for inline use.
 *
 * @param {boolean} fullScreen - If true, displays as a fixed, full-screen overlay.
 * @param {string} size - The size of the spinner (e.g., 'sm', 'md', 'lg'). Corresponds to DaisyUI size classes.
 * @param {string} colorClass - Tailwind class for text color (e.g., 'text-blue-500', 'text-primary').
 */
const LoadingSpinner = ({ fullScreen = true, size = 'lg', colorClass = 'text-primary' }) => {
    // DaisyUI/Tailwind mapping for size
    const sizeMap = {
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
        xl: 'loading-xl', // Note: Check if DaisyUI supports 'xl' or use custom classes if needed
    };

    const spinnerSizeClass = sizeMap[size] || 'loading-lg';

    // Base classes for the spinner icon itself
    const spinnerClasses = `loading loading-spinner ${colorClass} ${spinnerSizeClass}`;

    // Conditional container classes based on the fullScreen prop
    const containerClasses = fullScreen
        ? 'fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100/75 z-50 transition-opacity duration-300'
        : 'flex justify-center items-center w-full h-full';

    return (
        // 1. Accessibility: Use role="status" and an aria-label.
        <div className={containerClasses} role="status" aria-live="polite" aria-busy="true">
            {/* 2. Visual Polish: The actual spinner element */}
            <span className={spinnerClasses}>
                {/* 3. Accessibility: Visually hidden text for screen readers */}
                <span className="sr-only">Loading... Please wait.</span>
            </span>
        </div>
    );
};

// 4. Prop Types: Define expected props for better debugging and type checking (professional standard)
LoadingSpinner.propTypes = {
    fullScreen: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    colorClass: PropTypes.string,
};

export default LoadingSpinner;
