/* =========================================================
   PRIYANSHI JAIN — PORTFOLIO SCRIPT
   - Typewriter effect for the hero code window (home page)
   - Scroll-reveal for sections/cards
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Hero typewriter ---------- */
  const typeTarget = document.getElementById('typewriter');
  if (typeTarget) {
    const linesHTML = [
      '<span class="tok-kw">const</span> <span class="tok-fn">developer</span> <span class="tok-punc">=</span> <span class="tok-punc">{</span>',
      '&nbsp;&nbsp;<span class="tok-key">name</span><span class="tok-punc">:</span> <span class="tok-str">"Priyanshi Jain"</span><span class="tok-punc">,</span>',
      '&nbsp;&nbsp;<span class="tok-key">role</span><span class="tok-punc">:</span> <span class="tok-str">"Full Stack Developer"</span><span class="tok-punc">,</span>',
      '&nbsp;&nbsp;<span class="tok-key">based</span><span class="tok-punc">:</span> <span class="tok-str">"Indore, India"</span><span class="tok-punc">,</span>',
      '&nbsp;&nbsp;<span class="tok-key">stack</span><span class="tok-punc">:</span> <span class="tok-punc">[</span><span class="tok-str">"Node.js"</span><span class="tok-punc">,</span> <span class="tok-str">"Express"</span><span class="tok-punc">,</span> <span class="tok-str">"MongoDB"</span><span class="tok-punc">,</span> <span class="tok-str">"React"</span><span class="tok-punc">],</span>',
      '&nbsp;&nbsp;<span class="tok-key">cgpa</span><span class="tok-punc">:</span> <span class="tok-bool">9.22</span><span class="tok-punc">,</span>',
      '&nbsp;&nbsp;<span class="tok-key">openToWork</span><span class="tok-punc">:</span> <span class="tok-bool">true</span><span class="tok-punc">,</span>',
      '&nbsp;&nbsp;<span class="tok-key">currentFocus</span><span class="tok-punc">:</span> <span class="tok-str">"Building scalable, AI-powered web apps"</span>',
      '<span class="tok-punc">};</span>'
    ];

    let lineIndex = 0;

    const renderLine = () => {
      if (lineIndex >= linesHTML.length) {
        // remove cursor from last line, append fresh blinking cursor on new line
        const cursors = typeTarget.querySelectorAll('.cursor');
        cursors.forEach(c => c.remove());
        const final = document.createElement('div');
        final.innerHTML = '<span class="cursor"></span>';
        typeTarget.appendChild(final);
        return;
      }

      const row = document.createElement('div');
      const ln = document.createElement('span');
      ln.className = 'ln';
      ln.textContent = lineIndex + 1;
      row.appendChild(ln);

      const content = document.createElement('span');
      row.appendChild(content);
      typeTarget.appendChild(content.parentElement === row ? row : row);

      const html = linesHTML[lineIndex];
      let charIndex = 0;

      // Strip tags into a sequence we can reveal progressively isn't trivial with
      // nested spans, so type the raw HTML in small chunks for a snappy effect.
      const chunkSize = 3;
      const typeChunk = () => {
        charIndex += chunkSize;
        content.innerHTML = html.slice(0, charIndex);
        if (charIndex < html.length) {
          requestAnimationFrame(() => setTimeout(typeChunk, 8));
        } else {
          content.innerHTML = html;
          lineIndex++;
          setTimeout(renderLine, 90);
        }
      };
      typeChunk();
    };

    setTimeout(renderLine, 400);
  }

});