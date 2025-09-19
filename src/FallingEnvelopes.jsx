import React from 'react';

function FallingEnvelopes() {
  const envelopes = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="envelope"
      style={{
        position: 'absolute',
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (Math.random() * 3 + 2) + 's'
      }}
    >
      
    </div>
  ));

  return (
    <div className="falling-envelopes" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1
    }}>
      <style>
        {`
          .envelope {
            font-size: 1.5rem;
            animation: fall linear infinite;
          }
          
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
        `}
      </style>
      {envelopes}
    </div>
  );
}

export default FallingEnvelopes;
