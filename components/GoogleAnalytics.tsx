'use client';

import Script from 'next/script';


export default function GoogleAnalytics(props: { development: boolean }){
    // Don't track on GA if in development
    if(props.development) return null;

    return (
        <div className='container'>
            <Script src='https://www.googletagmanager.com/gtag/js?id=G-C31K1M56C5' />
            <Script id='google-analytics'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'G-C31K1M56C5');
                `}
            </Script>
        </div>
    )
}