import React from "react";

// Decorative moving blobs used on the welcome page background
const BackgroundBlobs = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* top-left orange blob */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl animate-pulse" />
        {/* floating pink swirl */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-pink-300/20 rounded-full blur-2xl animate-[spin_20s_linear_infinite]" />
        {/* bottom-right yellow blob */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
    </div>
);

export default BackgroundBlobs;
