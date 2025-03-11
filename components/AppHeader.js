export default function AppHeader({ title, description }) {
    return (
        <header id="header" className="py-20 mt-12 text-center border-b-2 bg-gradient-to-tr from-slate-100 to-slate-200">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold text-slate-700">{title}</h1>
                <p className="text-xl mt-4 text-slate-700">{description}</p>
            </div>
        </header>
    )
}