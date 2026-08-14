function svgAvatar({ bg, fg, initial }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
      <rect width="128" height="128" rx="64" fill="${bg}" />
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Space Grotesk, sans-serif" font-size="52" fill="${fg}">${initial}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_AI_AVATAR = svgAvatar({ bg: '#12151A', fg: '#00D9C0', initial: 'A' });
export const DEFAULT_USER_AVATAR = svgAvatar({ bg: '#12151A', fg: '#F2B84B', initial: 'U' });
