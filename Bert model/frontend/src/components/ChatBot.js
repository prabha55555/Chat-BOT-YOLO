import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatBot.css';
import logo from './logo.png'; // Replace with your logo image path

function ChatBot() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [quickReplies, setQuickReplies] = useState([]); // State for quick replies
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Load chat history from localStorage
        const storedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];
        setMessages(storedMessages);
    }, []);

    useEffect(() => {
        // Save chat history to localStorage
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }, [messages]);

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        addMessage({ text: message, sender: 'user' });
        setIsTyping(true);
        setMessage('');

        try {
            const res = await axios.post('http://localhost:5000/chat', { message });
            addMessage({ text: res.data.response, sender: 'bot' });

            // Set quick replies based on response
            if (res.data.quickReplies) {
                setQuickReplies(res.data.quickReplies);
            }
        } catch (err) {
            setError('Failed to get response from the server.');
        } finally {
            setIsTyping(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        addMessage({ text: 'Image uploaded', sender: 'user', image: URL.createObjectURL(file) });

        const formData = new FormData();
        formData.append('image', file);

        try {
            setIsTyping(true);
            const res = await axios.post('http://localhost:5000/chat', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            addMessage({ text: res.data.response, sender: 'bot' });
        } catch (err) {
            setError('Failed to get response from the server.');
        } finally {
            setIsTyping(false);
            setImage(null); // Clear image input after upload
        }
    };

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleClearChat = () => {
        setMessages([]);
        setError(null);
        setQuickReplies([]); // Clear quick replies
        localStorage.removeItem('chatHistory'); // Clear chat history from localStorage
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMessages = messages.filter(msg =>
        msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => console.log('Voice recognition started.');
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setMessage(transcript);
            console.log('Recognized: ', transcript);
        };
        recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
        recognition.onend = () => console.log('Voice recognition ended.');

        recognition.start();
    };

    const handleVoiceOutput = () => {
        if (!('speechSynthesis' in window)) {
            alert('Your browser does not support speech synthesis.');
            return;
        }

        const lastBotMessage = messages.slice().reverse().find(msg => msg.sender === 'bot');
        if (!lastBotMessage) return;

        const utterance = new SpeechSynthesisUtterance(lastBotMessage.text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleQuickReply = (reply) => {
        setMessage(reply);
        handleTextSubmit(new Event('submit')); // Submit the reply
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <img src={logo} alt="ChatBot Logo" />
                <h2>ChatBot with BERT and YOLO Integration</h2>
            </div>
            <div className="chatbot-content">
                <div className="chatbot-search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search chat history..."
                        className="chatbot-search-input"
                    />
                </div>
                <div className="chatbot-messages">
                    {filteredMessages.map((msg, index) => (
                        <div key={index} className={`chatbot-message ${msg.sender}`}>
                            {msg.image && <img src={msg.image} alt="Uploaded" className="chatbot-image-preview" />}
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    {error && <div className="chatbot-error">{error}</div>}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chatbot-form" onSubmit={handleTextSubmit}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="chatbot-input"
                    />
                    <div className="voice-buttons">
                        <button
                            type="button"
                            className="voice-input-button"
                            onClick={handleVoiceInput}
                        >
                            🎤
                        </button>
                        <button
                            type="button"
                            className="voice-output-button"
                            onClick={handleVoiceOutput}
                        >
                            🔊
                        </button>
                    </div>
                    <button type="submit" className="chatbot-button">Send</button>
                    <button type="button" className="chatbot-clear-button" onClick={handleClearChat}>Clear</button>
                </form>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    className="chatbot-file-input"
                    accept="image/*"
                />
                {quickReplies.length > 0 && (
                    <div className="quick-replies">
                        {quickReplies.map((reply, index) => (
                            <button
                                key={index}
                                className="quick-reply-button"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatBot;
