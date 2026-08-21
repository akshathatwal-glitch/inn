import React, { useRef, useEffect } from 'react';
import { Globe, ArrowRight, Focus, X, Play, ExternalLink } from 'lucide-react';
import { useModal } from '../hooks/useModal';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeFrame: number;

    const fadeTo = (targetOpacity: number, duration: number) => {
      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        video.style.opacity = (startOpacity + (targetOpacity - startOpacity) * progress).toString();

        if (progress < 1) {
          fadeFrame = requestAnimationFrame(animate);
        }
      };

      cancelAnimationFrame(fadeFrame);
      fadeFrame = requestAnimationFrame(animate);
    };

    const onCanPlay = () => {
      video.play();
      fadeTo(1, 500);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && parseFloat(video.style.opacity || '1') > 0.5) {
        fadeTo(0, 500);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelAnimationFrame(fadeFrame);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-hidden relative flex flex-col bg-black">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{ opacity: 0 }}
        />

        <nav className="relative z-20 px-6 py-6 w-full">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-6 h-6 text-white mr-2" />
              <span className="text-white font-semibold text-lg cursor-pointer" onClick={openModal}>AdaptLearn</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="#impact" className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer">The Problem</a>
                <a href="#solution" className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer">AI Solution</a>
                <a href="#impact" className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer">Impact</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={openModal} className="text-white text-sm font-medium hidden md:block">Login</button>
              <button 
                onClick={openModal}
                className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
              >
                Try Prototype
              </button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center mt-12 md:mt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight font-serif mb-6 max-w-4xl leading-[1.1]">
            Empowering Every Learner's <em className="italic">Unique Mind</em>.
          </h1>

          <p className="text-white/80 text-base md:text-lg leading-relaxed px-4 max-w-2xl mx-auto mb-10">
            AdaptLearn uses real-time AI to instantly transform dense, traditional study materials into personalized, neuro-inclusive learning experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button 
              onClick={openModal}
              className="bg-white text-black rounded-full px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Experience the Prototype <ExternalLink className="w-4 h-4" />
            </button>
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <Play className="w-4 h-4" /> Watch the Pitch Video
            </button>
          </div>
        </div>

        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button onClick={openModal} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Focus className="w-5 h-5" />
          </button>
          <button onClick={openModal} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <X className="w-5 h-5" />
          </button>
          <button onClick={openModal} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
