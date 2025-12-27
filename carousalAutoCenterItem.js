const carouselRef = useRef(null);

try {
      if (carouselRef.current) {
        const el = carouselRef.current.querySelector(`[data-id='${______mapped item_______.id}']`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const parentRect = carouselRef.current.getBoundingClientRect();
          const offset = rect.left - parentRect.left - parentRect.width / 2 + rect.width / 2;
          carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
      }
    } catch (e) {
      // ignore
    }
