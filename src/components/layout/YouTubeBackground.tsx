"use client";

interface YouTubeBackgroundProps {
    videoId: string;
    className?: string;
}

export const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({ videoId, className }) => {
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`;

    return (
        <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
            <iframe
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[1920px] min-h-[1080px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
        </div>
    );
};