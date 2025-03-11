"use client"

import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import SectionTitle from "@/components/SectionTitle";
import { UserMessage, AIMessage } from "@/components/Message";

export default function SectionOpenAIChat() {
    // 設計狀態:
    // 1. 使用者在輸入框上的輸入值(userInput) -> 透過事件取得使用者在輸入框上的輸入值
    const [userInput, setUserInput] = useState("Hello world!");
    // 2. 所有訊息記錄(messageList) -> 用以儲存所有使用者與AI的訊息
    const [messageList, setMessageList] = useState([]);
    // 3. 一則使用者的訊息(userMessage) -> 必須包含文字(text)與資料產生的時間(createdAt)
    // 4. 一則AI的訊息(aiMessage) -> 必須包含文字(text)與資料產生的時間(createdAt)
    // 5. 是否在等待後端回應(isWaiting)
    const [isWaiting,setIsWaiting]=useState(false)

    // 設計一個函數負責處理綁定表單送出的事件
    // 這個函數必須將 userMessage POST給後端API讓後端程式可以與OpenAI模型對接
    const submitHandler = (e) => {
        // 阻止表單重整的預設行為
        e.preventDefault();

        const userMessage = {
            // 取得使用者在輸入框上打的字
            text: userInput,
            // 取得當下的時間戳記
            createdAt: Date.now(),
            // 標記這則訊息是使用者發出的
            role: "user"
        };
        //console.log("userMessage", userMessage);
        // 清空輸入框
        setUserInput("");
        // 讓最新的訊息擺前面，過去的歷史訊息擺後面
        setMessageList([userMessage, ...messageList]);
        setIsWaiting(true)
        // axios.post("後端route所在的路徑", 要給後端的資料)
        axios
            .post("/api/chat-ai", userMessage)
            .then(res => {
                console.log("成功收到後端的回應", res);
                const aiMessage = res.data;
                // 同一程序中要更新狀態
                // 確保狀態已更新後才執行此輪更新 setXXX(prev => 新值)
                // prev 代表已經包含使用者訊息的訊息清單
                // 將AI的訊息加入到訊息列表中
                setMessageList(prev => [aiMessage, ...prev]);
                setIsWaiting(false)
            })
            .catch(err => {
                console.log("發生錯誤", err);
                setIsWaiting(false)
            });
    };

    return (
        <>
            <section id="SectionOpenAIChat" className="py-14 relative z-20">
                <div className="container mx-auto px-3">
                    <SectionTitle
                        title="3. 設計一個 AI ChatBot 應用"
                        subtitle="利用state特性將使用者與AI的對話渲染到畫面上。"
                    />
                    {/* 綁定表單送出的事件 */}
                    <form
                        className="flex"
                        onSubmit={submitHandler}
                    >
                        <input
                            type="text"
                            className="flex-1 border-2 border-slate-400 focus:border-slate-600 w-full rounded-md text-slate-700 block p-2"
                            placeholder="在此輸入你想跟AI講的話吧!"
                            minLength={2}
                            maxLength={200}
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            required
                        />
                        <button className="bg-slate-500 hover:bg-slate-600 active:bg-slate-70 text-white px-6 ml-3 rounded-md">送出</button>
                    </form>
                </div>
            </section>
            <section className="relative z-10 py-14 bg-gradient-to-t from-indigo-200 from-10% via-blue-200 via-30% to-white to-90%">
                <div className="container mx-auto">
                    <div className="px-3">
                        {
                            isWaiting && <div className="text-xl text-slate-800 animate-pulse">
                                <p>
                                <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                                    AI正在思考...
                                </p>
                            </div>

                        }
                        {
                            messageList.map(message => {
                                // 取出物件的role的值 可能是 user 或 ai
                                const { role, createdAt } = message;
                                if (role == "user") {
                                    return <UserMessage message={message} key={createdAt} />
                                } else if (role == "ai") {
                                    return <AIMessage message={message} key={createdAt} />
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}