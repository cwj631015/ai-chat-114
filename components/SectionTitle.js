export default function SectionTitle({ title, subtitle }) {
    return (
        <>
            <h2 className="text-2xl font-semibold text-slate-700 mb-5">{title}</h2>
            {subtitle ? <h3 className="text-xl text-slate-500 mb-5">{subtitle}</h3> : null}
        </>
    )
}