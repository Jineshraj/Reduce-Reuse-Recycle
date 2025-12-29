/* REQUIREMENTS: 
1. Array: 'floatingIcons' (e.g., [Camera, Film, Tv])
2. Styles: 'footerStyles.floatingIcon' (absolute + opacity)
3. Animation: '@keyframes float' inside footerStyles.customCSS
*/

<div className={footerStyles.floatingIconsContainer}>
  {[...Array(12)].map((_, i) => {
    // REUSE: Cycles icons and staggers animation timing
    const IconComponent = floatingIcons[i % floatingIcons.length];
    const delay = (i % 4) * 0.6;
    const dur = 6 + (i % 5);

    // REDUCE: Math-based scattering (i * 23) avoids manual positioning
    const left = (i * 23) % 100;
    const top = (i * 17) % 100;

    return (
      <div
        key={i}
        className={footerStyles.floatingIcon}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animation: `float ${dur}s infinite ease-in-out`,
          animationDelay: `${delay}s`
        }}
      >
        <IconComponent className="w-8 h-8" />
      </div>
    );
  })}
</div>
