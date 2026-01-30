import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
    "Channabasavaswami Mathad – Full-Stack Web Developer";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0b0d10", // matches dark UI base
                    color: "#e5e7eb",
                    fontFamily: "Inter, sans-serif",
                    position: "relative",
                }}
            >
                {/* Ambient glow (same idea as Hero) */}
                <div
                    style={{
                        position: "absolute",
                        top: "-120px",
                        left: "-120px",
                        width: "420px",
                        height: "420px",
                        backgroundColor: "rgba(99,102,241,0.12)", // primary/indigo soft glow
                        borderRadius: "9999px",
                        filter: "blur(120px)",
                    }}
                />

                {/* Card */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "56px",
                        padding: "64px 72px",
                        borderRadius: "28px",
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                        zIndex: 1,
                    }}
                >
                    {/* Profile image */}
                    <img
                        src="https://channabasumathad.vercel.app/Channabasumathad.jpg"
                        alt="Channabasavaswami Mathad"
                        width={240}
                        height={240}
                        style={{
                            borderRadius: "22px",
                            objectFit: "cover",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                        }}
                    />

                    {/* Text block */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "560px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "14px",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#9ca3af",
                                marginBottom: "10px",
                            }}
                        >
                            Full-Stack Web Developer
                        </span>

                        <h1
                            style={{
                                fontSize: "52px",
                                fontWeight: 500,
                                lineHeight: 1.1,
                                margin: 0,
                                color: "#f9fafb",
                            }}
                        >
                            Channabasavaswami Mathad
                        </h1>

                        <p
                            style={{
                                fontSize: "22px",
                                lineHeight: 1.6,
                                marginTop: "18px",
                                color: "#9ca3af",
                                fontWeight: 300,
                            }}
                        >
                            Building scalable, production-ready web applications
                            with Next.js, clean architecture, and thoughtful UX.
                        </p>

                        {/* Minimal skill pills */}
                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                marginTop: "26px",
                            }}
                        >
                            {["Next.js", "React", "AI"].map((skill) => (
                                <span
                                    key={skill}
                                    style={{
                                        fontSize: "16px",
                                        padding: "8px 16px",
                                        borderRadius: "999px",
                                        backgroundColor: "rgba(255,255,255,0.06)",
                                        color: "#d1d5db",
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        size
    );
}
