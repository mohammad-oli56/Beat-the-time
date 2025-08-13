import React, { useState } from "react";

const faqData = [
    {
        question: "How can I explore upcoming events?",
        answer:
            "You can browse upcoming events on our platform by date, category, or location to find the ones that interest you.",
    },
    {
        question: "Can I register for an event after exploring it?",
        answer:
            "Yes, once you find an event you like, you can register directly from the event page using a simple signup process.",
    },
    {
        question: "Are there any fees for attending events?",
        answer:
            "Some events are free, while others require a ticket purchase. All fee details are clearly displayed on the event page.",
    },
    {
        question: "Can I attend events using my mobile device?",
        answer:
            "Absolutely! Our platform is fully responsive, so you can explore and register for events using your phone, tablet, or laptop.",
    },
    {
        question: "What should I do if I face issues while registering for an event?",
        answer:
            "You can contact our support team 24/7 via email or live chat. Most registration issues are resolved quickly.",
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
