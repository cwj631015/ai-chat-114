// 關於next.js架構API建置規則可參考
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

import openai from "@/services/openai";

export async function POST(request) {
    // 接收並解析前端傳來的物件
    const userMessage = await request.json();
    console.log("前端傳來的資料", userMessage);
    const{name,city,occupation}=userMessage;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            //系統AI人設設定
            { role: "system", content: `你是一個自我介紹產生器，可以根據使用者填入的資料產生一份簡歷`},
            {
            //將使用者訊息傳給AI
                role: "user",
                content:`使用者資料
                姓名:${name}
                居住城市:${city}
                職業:${occupation}`
            },
        ],
    });
    
    console.log("AI回應的completion",completion.choices[0].message);
    const aiContent = completion.choices[0].message.content


    const aiMessage = {
        intro: aiContent,
       
    }
    // 將後端處理完成的資料回傳給前端
    // return Response.json(要給前端的資料);
    return Response.json(aiMessage);
}