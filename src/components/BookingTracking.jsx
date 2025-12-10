import React from 'react';

const BookingTracking = ({ status }) => {
    const steps = [
        { id: 'pending', label: 'Booked' },
        { id: 'confirmed', label: 'Assigned' },
        { id: 'planning', label: 'Planning' },
        { id: 'materials', label: 'Materials' },
        { id: 'on-way', label: 'On Way' },
        { id: 'setup', label: 'Setup' },
        { id: 'completed', label: 'Completed' }
    ];

    // Determine current step index
    // If status is 'pending' or 'paid', we might show 0 or -1 (Waiting)
    // If status is 'in-progress', it's vague, but let's assume it maps to 'planning' or just handle specific ones.

    // We strictly use the new statuses. 'pending'/'paid' are pre-assignment.

    const getCurrentStepIndex = () => {
        // 'paid' is virtually same as 'pending' (Booked) but paid. 
        // We can treat it as step 0 completed or step 0. 
        // For simplicity, let's map 'paid' to 'pending' index (0) but maybe color it?
        // Or better, let's make 'paid' the status after pending if we want.
        // But the user flow is: Book -> Pay. 
        if (status === 'paid') return 0;
        return steps.findIndex(step => step.id === status);
    };

    const currentStepIndex = getCurrentStepIndex();

    return (
        <div className="w-full py-4">
            <ul className="steps steps-vertical lg:steps-horizontal w-full">
                {steps.map((step, index) => (
                    <li
                        key={step.id}
                        className={`step ${index <= currentStepIndex ? 'step-primary' : ''} `}
                    >
                        {step.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingTracking;
