import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface HashQRCodeProps {
  hash: string;
  size?: number;
}

const HashQRCode: React.FC<HashQRCodeProps> = ({ hash, size = 200 }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
      <div
        className="bg-white dark:bg-gray-900 rounded-lg p-4 inline-block"
        style={{ width: size, height: size }}
      >
        <QRCodeSVG
          value={hash}
          size={size - 32}
          level="H"
          includeMargin
          className="mx-auto"
        />
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          QR Code for hash
        </p>
      </div>
    </div>
  );
};

export default HashQRCode;