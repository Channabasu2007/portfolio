import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Channabasavaswami Mathad - Full-Stack Web Developer';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #333',
                        borderRadius: '20px',
                        padding: '40px 80px',
                        backgroundColor: '#111',
                        boxShadow: '0 0 50px -10px rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '60px',
                            fontWeight: 900,
                            background: 'linear-gradient(to bottom right, #fff 30%, #666)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}
                    >
                        Channabasavaswami Mathad
                    </h1>
                    <p
                        style={{
                            fontSize: '30px',
                            color: '#888',
                            margin: 0,
                            textAlign: 'center',
                        }}
                    >
                        Full-Stack Web Developer
                    </p>
                    <div style={{ display: 'flex', marginTop: '40px', gap: '20px' }}>
                        <div style={{ padding: '10px 20px', backgroundColor: '#333', borderRadius: '30px', fontSize: '20px' }}>Next.js</div>
                        <div style={{ padding: '10px 20px', backgroundColor: '#333', borderRadius: '30px', fontSize: '20px' }}>React</div>
                        <div style={{ padding: '10px 20px', backgroundColor: '#333', borderRadius: '30px', fontSize: '20px' }}>AI</div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
