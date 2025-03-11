"use client"

// 從react模組內引入useState Hook
import { useState } from "react";
// 並且定義此元件成為前端元件(只有前端元件可以使用React Hook)
import axios from "axios";

import SectionTitle from "@/components/SectionTitle";
// 引入臺灣城市清單 參考 @/data/taiwan-cities
import taiwanCities from "@/data/taiwan-cities";

export default function SectionIntro() {
    //console.log("SectionIntro準備要被渲染了...")
    // 
    // 將使用者會輸入的值定義為狀態(state)，讓元件可以將最新的狀態渲染(render)到畫面上
    // 建立名字狀態，預設值為空字串
    const [name, setName] = useState("黃金城")
    // 建立居住城市狀態，預設值為新竹市
    const [city, setCity] = useState("雲林縣")
    // 建立職業狀態，預設值為空字串
    const [occupation, setOccupation] = useState("工程師")
    const [copyHint, setCopyHint] = useState("")
    const [intro,setIntro] =useState("") 
    const submitHandler=(e)=>{
        e.preventDefault();
        const userMessage = {name,city,occupation};
        axios
        .post("/api/intro-ai",userMessage)
        .then(res=>{
            console.log("請求成功",res.data);
            setIntro(res.data.intro)
        })
        .catch(err => {
            console.log("請求時發生錯誤",err);
            setIntro("請求時發生錯誤，請再試一次")

        })

    }

    

    return (
        <section id="SectionIntro" className="border-b-2 py-14">
            <div className="container mx-auto px-3">
                <SectionTitle
                    title="2. 設計一個自我介紹產生器"
                    subtitle="綁定輸入框的改變事件，在輸入框資料改變時即時產生自我介紹。"
                />
                <div className="grid grid-cols-2 gap-10">
                    {/* 輸入區 */}
                    <form onSubmit={submitHandler} className="py-4">
                        <div className="mb-3">
                            <label htmlFor="nameInputUI" className="text-slate-700 block mb-1">姓名 <span className="text-red-500">*</span></label>
                            {/* 綁定姓名輸入框的變動事件，並在發生變動時更新姓名狀態 */}
                            <input
                                id="nameInputUI"
                                type="text"
                                className="border-2 border-slate-400 focus:border-indigo-600 w-full rounded-md text-slate-700 focus:text-indigo-600 block p-2"
                                placeholder="在此輸入您的姓名..."
                                value={name}
                                onChange={e => {
                                    // e 為事件參數，可獲得一切跟change事件相關的資訊
                                    // e.target.value 當下使用者在輸入框內的值
                                    // console.log("名字輸入框的值被改變了...", e.target.value)
                                    // 更新name讓畫面上的name呈現最終的新值
                                    setName(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cityInputUI" className="text-slate-700 block mb-1">居住城市</label>
                            {/* 綁定城市下拉選單的變動事件，並在發生變動時更新城市狀態 */}
                            <select
                                id="cityInputUI"
                                className="border-2 border-slate-400 focus:border-indigo-600 w-full rounded-md text-slate-700 block p-2"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            >
                                {
                                    taiwanCities.map(city => <option key={city} value={city}>{city} </option>)
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="occupationInputUI" className="text-slate-700 block mb-1">職業<span className="text-red-500">*</span></label>
                            {/* 綁定職業輸入框的變動事件，並在發生變動時更新職業狀態 */}
                            <input
                                id="occupationInputUI"
                                type="text"
                                className="border-2 border-slate-400 focus:border-indigo-600 w-full rounded-md text-slate-700 focus:text-indigo-600 block p-2"
                                placeholder="在此輸入您的職業"
                                value={occupation}
                                onChange={e => setOccupation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2 rounded-md w-full"
                            type="submit"
                            >
                            送出表單
                            </button>

                        </div>

                    </form>
                    {/* 預覽區 */}
                    <div className="py-4">
                        <h4 className="text-xl font-semibold text-slate-700 mb-3">自我介紹預覽</h4>
                        {/* 讓自我介紹呈現在textarea內 */}
                        <textarea
                            className="border-2 border-slate-400 focus:border-indigo-600 min-h-48 w-full rounded-md text-slate-700 focus:text-indigo-600 block p-3"
                            value={intro}
                            readOnly
                        ></textarea>
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2 rounded-md mt-3"
                            onClick={() => {
                                navigator.clipboard.writeText(intro)
                                    .then(() => {
                                        setCopyHint("複製成功了!")
                                        setTimeout(() => {
                                            // 3秒後要做的事...
                                            setCopyHint("")
                                        }, 3000)
                                    })
                                    .catch(() => alert("請更新瀏覽器後再試一次"))
                            }}
                        >
                            複製自我介紹到剪貼簿
                        </button>

                        <p className="text-indigo-500 mt-3">
                            {copyHint}
                        </p>


                    </div>
                </div>
            </div>
        </section>
    )
}