// 關於next.js架構API建置規則可參考
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

import openai from "@/services/openai";

export async function POST(request) {
    // 接收並解析前端傳來的物件
    const userMessage = await request.json();
    console.log("前端傳來的資料", userMessage);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            //系統AI人設設定
            { role: "system", content: `你是正芳公司專業客服人員
            聯絡電話:05-5328511
            傳真:05-5347840
            聯絡人:王秋嵐
            公司地址:雲林縣斗六市明德北路三段287號
            公司主要產品為活塞環製作
            有關於氣缸及活塞及汽車相關回答，其餘不在業物範圍內
            服務時間:08:00~17:00

                
                
            ` },
            {
            //將使用者訊息傳給AI
                role: "user",
                content: userMessage.text
            },
        ],
    });
    
    console.log("AI回應的completion",completion.choices[0].message);
    const aiContent = completion.choices[0].message.content


    const aiMessage = {
        text: aiContent,
        createdAt: Date.now(),
        role: "ai"
    }
    // 將後端處理完成的資料回傳給前端
    // return Response.json(要給前端的資料);
    return Response.json(aiMessage);
}