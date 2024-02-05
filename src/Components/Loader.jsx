import React from "react";

const Loader = () => {
  return (
    <div className="h-[600px] flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "rgb(255, 255, 255)",
          display: "block",
          shapeRendering: "auto",
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#e90c59"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.1494252873563218s"
            values="0;43"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="0s"
          />
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.1494252873563218s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="0s"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#46dff0"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.1494252873563218s"
            values="0;43"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="-0.5747126436781609s"
          />
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.1494252873563218s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="-0.5747126436781609s"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
