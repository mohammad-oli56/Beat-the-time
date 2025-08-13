import React, { useState } from "react";

const faqData = [
    {
        question: "What is the best way to study online?",
        answer:
            "The best way is to follow a daily routine, take notes actively, and minimize distractions for better focus.",
    },
    {
        question: "Can I access courses after purchase?",
        answer:
            "Yes, all purchased courses will be available in your dashboard to watch anytime, from any device.",
    },
    {
        question: "Are certificates provided after completion?",
        answer:
            "Yes, a professional, downloadable certificate will be awarded once you finish all lessons and pass the final quiz.",
    },
    {
        question: "Can I study on mobile devices?",
        answer:
            "Absolutely! Our platform is fully responsive, allowing you to study on phones, tablets, or laptops with ease.",
    },
    {
        question: "What should I do if I face technical issues?",
        answer:
            "You can contact our support team 24/7 via email or live chat. Most issues are resolved within a few hours.",
    },
];

const Faquestion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="max-w-5xl mx-auto  px-4">
          
            <div className="flex justify-between gap-20 items-center">
                <div className="flex-1">
                    <img src="https://i.ibb.co/WpBRFLmY/FAQtest2-927x1024-png.webp" alt="" />
                </div>
                <div className="flex-1">
                      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="mb-4 border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-[0px_2px_20px_rgba(255,0,0,0.2),0px_0px_30px_rgba(0,0,255,0.3)]"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left px-5 py-4 bg-white hover:bg-gray-50 flex justify-between items-center"
                            >
                                <span className="text-lg font-medium text-gray-900">
                                    {item.question}
                                </span>
                                <span className="text-2xl text-orange-500">
                                    {openIndex === index ? "-" : "+"}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-5 pb-4 text-gray-700 bg-gray-50">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Faquestion;
