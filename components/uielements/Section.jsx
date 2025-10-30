export default function Section({ className, sclass, children }) {
    return (
        <section className={`${sclass}`}>
            <div className={`container ${className}`}>
                {children}
            </div>
        </section>
    )
}
