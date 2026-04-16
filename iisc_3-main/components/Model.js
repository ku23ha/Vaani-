import React, {useEffect, useState, useRef} from "react";
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import output from "../src/data/output.json";
import VideoJS from '../components/VideoJS';
import MediaPlayer from '../components/MediaPlayer';
import { XIcon } from "@heroicons/react/solid";

function getRandomNumber(max) {
    if (typeof max !== 'number' || max <= 0) {
        throw new Error('Input must be a positive number greater than 0');
    }
    return Math.floor(Math.random() * max);
}

// Helper function to get gender data regardless of case
function getGenderData(languageData, gender) {
    if (!languageData) return null;
    
    // Try the exact case first
    if (languageData[gender]) {
        return languageData[gender];
    }
    
    // Try lowercase
    if (languageData[gender.toLowerCase()]) {
        return languageData[gender.toLowerCase()];
    }
    
    // Try uppercase first letter
    const capitalized = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    if (languageData[capitalized]) {
        return languageData[capitalized];
    }
    
    return null;
}

export default function Model({ districtName, setPopup }) {
    const data = output[districtName];
    const [open, setOpen] = useState(true);
    const playerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const languages = Object.keys(data ?? {});

    const [link, setLink] = useState(null);

    const options = {
        controls: true,
        responsive: true,
        fluid: true,
        aspectRatio: '16:9',
        autoplay: false,
        preload: 'auto',
    };

    if (!data) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl text-center shadow-2xl">
                    <span className="text-white/60 font-bold uppercase tracking-widest text-sm">
                        Data pending for {districtName}
                    </span>
                    <button 
                        onClick={() => setPopup(false)}
                        className="mt-6 block w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-bold uppercase tracking-widest text-xs"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/95 transition-opacity backdrop-blur-md" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 lg:p-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0 translate-y-8 scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-8 scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden bg-[#050505] border border-white/10 rounded-[2.5rem] text-left shadow-[0_0_100px_rgba(66,133,244,0.1)] transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                                
                                {/* Header */}
                                <div className="flex items-center justify-between p-8 border-b border-white/5 bg-white/[0.02]">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4285F4] mb-2 block">Region Analysis</span>
                                        <Dialog.Title as="h3" className="text-3xl font-black text-white tracking-widest uppercase">
                                            {districtName} <span className="text-white/20">/</span> Dialect Atlas
                                        </Dialog.Title>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setOpen(false);
                                            setPopup(false);
                                        }}
                                        className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all border border-white/10 group"
                                    >
                                        <XIcon className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" />
                                    </button>
                                </div>

                                <div className="p-8 lg:p-12">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                        
                                        {/* Left Side: Stats Table */}
                                        <div className="lg:col-span-7 space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-white/[0.01] border-b border-white/5">
                                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Reported Dialect</th>
                                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 text-center">Male</th>
                                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 text-center">Female</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/5">
                                                        {languages?.map((language) => {
                                                            const maleData = getGenderData(data[language], 'male');
                                                            const femaleData = getGenderData(data[language], 'female');
                                                            
                                                            return (
                                                                <tr key={language} className="hover:bg-white/[0.02] transition-colors group">
                                                                    <td className="px-6 py-5 text-sm font-bold text-white transition-colors group-hover:text-[#4285F4]">
                                                                        {language}
                                                                    </td>
                                                                    <td className="px-6 py-5 text-center">
                                                                        {maleData?.length > 0 ? (
                                                                            <button
                                                                                onClick={() => setLink(maleData[maleData.length - 1]?.link)}
                                                                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-[#4285F4] transition-colors"
                                                                            >
                                                                                <div className="h-1.5 w-1.5 rounded-full bg-[#4285F4] animate-pulse" />
                                                                                Listen
                                                                            </button>
                                                                        ) : <span className="text-white/10">—</span>}
                                                                    </td>
                                                                    <td className="px-6 py-5 text-center">
                                                                        {femaleData?.length > 0 ? (
                                                                            <button
                                                                                onClick={() => setLink(femaleData[femaleData.length - 1]?.link)}
                                                                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-[#4285F4] transition-colors"
                                                                            >
                                                                                <div className="h-1.5 w-1.5 rounded-full bg-[#4285F4] animate-pulse" />
                                                                                Listen
                                                                            </button>
                                                                        ) : <span className="text-white/10">—</span>}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            
                                            <div className="flex gap-10 p-6 bg-[#4285F4]/5 rounded-3xl border border-[#4285F4]/20">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4285F4]/60 block mb-1">Total Languages</span>
                                                    <span className="text-2xl font-black text-white">{languages.length}</span>
                                                </div>
                                                <div className="h-12 w-px bg-[#4285F4]/20" />
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4285F4]/60 block mb-1">Status</span>
                                                    <span className="text-2xl font-black text-white">Active</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Player */}
                                        <div className="lg:col-span-5">
                                            <div className="sticky top-0">
                                                <div className="relative rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl group">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                                                    <div className="p-1 px-1 aspect-video">
                                                        <MediaPlayer
                                                            url={link}
                                                            options={options}
                                                            onReady={handlePlayerReady}
                                                        />
                                                    </div>
                                                    {!link && (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#080808] z-20 transition-all group-hover:bg-[#0a0a0a]">
                                                            <div className="h-20 w-20 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-6 animate-spin-slow">
                                                                <svg className="h-8 w-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-bold text-white mb-2 tracking-tight">Select a dialect to explore</h4>
                                                            <p className="text-white/40 text-sm max-w-[200px] font-medium leading-relaxed">
                                                                Experience the authentic voices of {districtName}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                                                     <p className="text-xs font-medium text-white/40 leading-relaxed italic">
                                                        "Project Vaani captures the raw soul of regional dialects, ensuring no sound is lost to time."
                                                     </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
