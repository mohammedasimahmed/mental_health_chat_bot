import { useState } from "react"

const ChatComponent = () => {
    const [question, setQuestion] = useState('');
    const [answer, serAnswer] = useState('');
    const handleGetQuestion = (e) => {
        setQuestion(e.target.value);
    }
    const handleGetAnswer = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:5000/mental_health`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "text": question,
                }),
            })
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                serAnswer(data.answer);
               console.log("got aanswer!!");
            }
            if (!response.ok) {

                console.log("The status code :", response.status)
                console.log("login failed");

            }

        } catch (err) {
            console.error(`Error logging the user`, err.message);
        }

    }





    return (
        <div>
            <input
                type="text"
                onChange={handleGetQuestion}
                value={question}
            />
            <button
                onClick={handleGetAnswer}
            >Get answer</button>
            <div>
                {answer}
            </div>
        </div>
    )
}

export default ChatComponent;