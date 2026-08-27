const fs = require('fs');

let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

const oldLogic = `  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered.current && reviews.length > 0) {
        scrollRef.current.scrollLeft += 0.6; // Slow and readable speed
        
        // Reset to start seamlessly if we hit the cloned end
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start after a tiny delay to let DOM render
    setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 1000);
    
    return () => cancelAnimationFrame(animationId);
  }, [reviews.length]);`;

const newLogic = `  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const floatPosition = useRef(0);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered.current && reviews.length > 0) {
        // scrollLeft only accepts integers on most browsers, so we accumulate the float manually
        floatPosition.current += 0.5; 
        if (floatPosition.current >= 1) {
          scrollRef.current.scrollLeft += 1;
          floatPosition.current -= 1;
        }
        
        // Loop back smoothly
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) {
          scrollRef.current.scrollLeft = 1;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start animation
    animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, [reviews.length]);`;

content = content.replace(/\r\n/g, '\n');
content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/ReviewsSection.tsx', content);
console.log('Fixed scroll precision');
