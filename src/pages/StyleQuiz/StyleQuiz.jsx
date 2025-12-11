import React, { useState } from 'react';
import { Link } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { FiCheck, FiArrowRight, FiRefreshCw } from 'react-icons/fi';

const questions = [
    {
        id: 1,
        question: "What's your ideal color palette?",
        options: [
            { text: "Neutral & Earthy (Beige, Brown, Green)", style: "Minimalist" },
            { text: "Bold & Vibrant (Red, Yellow, Blue)", style: "Bohemian" },
            { text: "Sleek & Monochromatic (Black, White, Grey)", style: "Modern" },
            { text: "Warm & Rich (Gold, Deep Blue, Velvet)", style: "Classic" }
        ]
    },
    {
        id: 2,
        question: "Which furniture piece speaks to you?",
        options: [
            { text: "A clean-lined, functional sofa", style: "Modern" },
            { text: "A vintage, ornate armchair", style: "Classic" },
            { text: "A低 low-profile wooden bench", style: "Minimalist" },
            { text: "A patterned, eclectic rug", style: "Bohemian" }
        ]
    },
    {
        id: 3,
        question: "How do you want your home to feel?",
        options: [
            { text: "Calm and clutter-free", style: "Minimalist" },
            { text: "Artistic and free-spirited", style: "Bohemian" },
            { text: "Sophisticated and timeless", style: "Classic" },
            { text: "Cutting-edge and cool", style: "Modern" }
        ]
    },
    {
        id: 4,
        question: "Pick a material you love:",
        options: [
            { text: "Glass and Steel", style: "Modern" },
            { text: "Natural Wood and Stone", style: "Minimalist" },
            { text: "Velvet and Mahogany", style: "Classic" },
            { text: "Rattan and Macrame", style: "Bohemian" }
        ]
    }
];

const StyleQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({ Modern: 0, Minimalist: 0, Bohemian: 0, Classic: 0 });
    const [showResult, setShowResult] = useState(false);
    const [resultStyle, setResultStyle] = useState("");

    const axiosPublic = useAxiosPublic();
    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axiosPublic.get('/services');
            return res.data.data;
        }
    });

    const handleAnswer = (style) => {
        const newScores = { ...scores, [style]: scores[style] + 1 };
        setScores(newScores);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate winner
            const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
            setResultStyle(winner);
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setScores({ Modern: 0, Minimalist: 0, Bohemian: 0, Classic: 0 });
        setCurrentQuestion(0);
        setShowResult(false);
        setResultStyle("");
    };

    // Filter services based on result style (simple string matching in description or category if available)
    // Since we might not have explicit 'style' tags, we'll match broadly or show all if specific match logic isn't in backend yet.
    // For demo purposes, we will imply a match or just show recommended services.
    const recommendedServices = services.filter(service =>
        service.title.toLowerCase().includes(resultStyle.toLowerCase()) ||
        service.description.toLowerCase().includes(resultStyle.toLowerCase()) ||
        service.category.toLowerCase().includes(resultStyle.toLowerCase())
    ).slice(0, 3);

    // Fallback if no direct match found
    const displayServices = recommendedServices.length > 0 ? recommendedServices : services.slice(0, 3);


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className=" w-full bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">

                {/* Header */}
                <div className="bg-primary p-8 text-white text-center">
                    <h1 className="text-3xl font-bold">AI Style Decor Quiz</h1>
                    {!showResult && <p className="opacity-90 mt-2">Question {currentQuestion + 1} of {questions.length}</p>}
                </div>

                <div className="p-8 flex-grow flex flex-col justify-center">
                    {!showResult ? (
                        <div className="animate-fade-in-up">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">{questions[currentQuestion].question}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option.style)}
                                        className="btn btn-outline btn-lg h-auto py-4 text-left justify-start hover:bg-primary hover:text-white transition-all border-gray-200"
                                    >
                                        <span className="mr-3 bg-gray-100 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold group-hover:bg-white">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-fade-in">
                            <h2 className="text-4xl font-bold text-primary mb-2">You are {resultStyle}!</h2>
                            <p className="text-gray-600 mb-8">Your style reflects a love for {resultStyle.toLowerCase()} elements. succinct, elegant, and perfectly you.</p>

                            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 inline-block">Recommended for You</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                                {displayServices.map(service => (
                                    <ServiceCard key={service._id} service={service} />
                                ))}
                            </div>

                            <div className="flex justify-center gap-4">
                                <button onClick={resetQuiz} className="btn btn-outline gap-2">
                                    <FiRefreshCw /> Retake Quiz
                                </button>
                                <Link to="/services" className="btn btn-primary text-white gap-2">
                                    Browse All Services <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                {!showResult && (
                    <div className="bg-gray-100 h-2 w-full">
                        <div
                            className="bg-accent h-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StyleQuiz;
