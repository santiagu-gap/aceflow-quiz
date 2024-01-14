'use client';

import { useTheme } from 'next-themes';
import React from 'react';

const CoolBlur = () => {
  return (
    <div
      className={`absolute top-0 -z-50 h-72 w-full bg-gradient-to-r from-red-500/[0.10] via-rose-500/[0.10] to-pink-500/[0.10] blur-[150px] dark:from-red-500/25 dark:via-rose-500/25 dark:to-pink-500/25`}
    />
  );
};

export default CoolBlur;
