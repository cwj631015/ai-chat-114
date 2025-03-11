export default function FortuneCard({ fortune }) {
    const { level, content, createdAt } = fortune;
    // TODO: 將抽籤時間轉換為使用者可讀的格式

    return (
        <div
            className="fortune-card relative bg-white text-white bg-cover shadow-xl p-4 rounded-xl overflow-hidden"
        >
            <div className="relative z-20">
                <h3 className="text-xl font-bold text-shadow-md">{level}</h3>
                <p className="mt-2">{content}</p>
                <p className="mt-2 text-sm">抽籤時間: {createdAt}</p>
            </div>
            <div
                className="fortune-bg w-full h-full absolute z-10 left-0 top-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/fortune-bg.png')"
                }}
            >
            </div>
        </div>
    )
}