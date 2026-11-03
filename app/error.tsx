'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="wrap section"><h1>We couldn’t load this page.</h1><p>Please try again, or contact OFFDAYA on WhatsApp.</p><button className="button" onClick={reset}>Try again</button><p><a href="https://wa.me/917994849989">WhatsApp +91 79948 49989</a></p></div>}
