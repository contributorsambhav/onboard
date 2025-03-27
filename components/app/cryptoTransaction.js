export default function CryptoTransaction() {
  return (
    <section className="py-16 px-5 to-white w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center w-full">
          <div className="relative">
            <div className="p-6 relative z-10">
              <h3 className="text-xl  justify-center font-semibold text-emerald-700 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75ZM12 22.25L5.75 13L12 16.75L18.25 13L12 22.25Z"
                    fill="currentColor"
                  />
                </svg>
                Crypto Transaction
              </h3>
              <div className="relative h-32 md:h-44 lg:h-64 overflow-hidden">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sender */}
                  <circle
                    cx="80"
                    cy="80"
                    r="30"
                    fill="#ECFDF5"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  <path
                    className="animate-pulse"
                    d="M80 60C73.6348 60 67.7305 62.5286 63.5294 66.7294C59.3286 70.9305 56.8 76.8348 56.8 83.2C56.8 89.5652 59.3286 95.4695 63.5294 99.6706C67.7305 103.871 73.6348 106.4 80 106.4C86.3652 106.4 92.2695 103.871 96.4706 99.6706C100.671 95.4695 103.2 89.5652 103.2 83.2C103.2 76.8348 100.671 70.9305 96.4706 66.7294C92.2695 62.5286 86.3652 60 80 60ZM87.6 88H81.6V94H78.4V88H72.4V84.8H78.4V78.8H81.6V84.8H87.6V88Z"
                    fill="#10B981"
                  />
                  <text
                    x="80"
                    y="130"
                    textAnchor="middle"
                    fill="#4B5563"
                    fontSize="14"
                  >
                    Sender
                  </text>

                  {/* Receiver */}
                  <circle
                    cx="320"
                    cy="80"
                    r="30"
                    fill="#ECFDF5"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  <path
                    className="animate-pulse"
                    d="M320 60C313.635 60 307.73 62.5286 303.529 66.7294C299.329 70.9305 296.8 76.8348 296.8 83.2C296.8 89.5652 299.329 95.4695 303.529 99.6706C307.73 103.871 313.635 106.4 320 106.4C326.365 106.4 332.27 103.871 336.471 99.6706C340.671 95.4695 343.2 89.5652 343.2 83.2C343.2 76.8348 340.671 70.9305 336.471 66.7294C332.27 62.5286 326.365 60 320 60ZM327.6 88H321.6V94H318.4V88H312.4V84.8H318.4V78.8H321.6V84.8H327.6V88Z"
                    fill="#10B981"
                  />
                  <text
                    x="320"
                    y="130"
                    textAnchor="middle"
                    fill="#4B5563"
                    fontSize="14"
                  >
                    Receiver
                  </text>

                  {/* Blockchain */}
                  <rect
                    x="150"
                    y="60"
                    width="100"
                    height="40"
                    rx="8"
                    fill="#ECFDF5"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="85"
                    textAnchor="middle"
                    fill="#059669"
                    fontSize="14"
                    fontWeight="500"
                  >
                    Blockchain
                  </text>

                  {/* Flow Arrows */}
                  <path
                    className="transaction-path crypto-path"
                    d="M110 80 L150 80"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <path
                    className="transaction-path crypto-path"
                    d="M250 80 L290 80"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-emerald-50 p-2 rounded-md flex flex-col items-center">
                  <span className="text-xs font-medium text-emerald-700">
                    Step 1
                  </span>
                  <span className="text-xs text-neutral-600">Initiation</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded-md flex flex-col items-center">
                  <span className="text-xs font-medium text-emerald-700">
                    Step 2
                  </span>
                  <span className="text-xs text-neutral-600">Verification</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded-md flex flex-col items-center">
                  <span className="text-xs font-medium text-emerald-700">
                    Step 3
                  </span>
                  <span className="text-xs text-neutral-600">Settlement</span>
                </div>
              </div>
            </div>

            {/* Summary Callout */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm max-w-2xl mx-auto">
              <h4 className="text-blue-800 font-medium mb-2 text-center">
                Why Crypto Transfers Are Superior
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Direct peer-to-peer transfers without intermediaries
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Settlement in minutes instead of days</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Fewer points of failure with simpler transaction flow
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Transparent transaction tracking on the blockchain
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
