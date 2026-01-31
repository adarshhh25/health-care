/**
 * Cleans text for Text-to-Speech (TTS) playback by removing markdown symbols
 * and formatting it for natural speech flow.
 * 
 * @param {string} text - The input text containing markdown or formatting.
 * @returns {string} - The cleaned text ready for speech synthesis.
 */
export const cleanTextForSpeech = (text) => {
    if (!text) return '';

    let clean = text;

    // 1. Remove markdown images: ![alt](url) -> alt
    clean = clean.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');

    // 2. Remove markdown links: [text](url) -> text
    // Captures the text inside the brackets and discards the URL
    clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // 3. Handle Headers and Blockquotes
    // Replaces lines starting with # or > with a period to induce a pause
    clean = clean.replace(/(?:^|\n)\s*[#>✔]+\s+/g, '. ');

    // 4. Handle Lists (Bullets)
    // Replaces *, -, +, •, and numbered lists (optional, keeping numbers might be better but user asked for clean flow)
    // We'll replace bullet points with a period for pause. 
    // We preserve numbers (e.g. "1.") as they are often semantic.
    clean = clean.replace(/(?:^|\n)\s*[-*+•]\s+/g, '. ');

    // 5. Remove all remaining markdown/formatting symbols
    // *, _, `, ~, ^, =, |
    clean = clean.replace(/[*_`~^=|]/g, '');

    // 6. Handle Horizontal Rules (---, ***)
    clean = clean.replace(/(?:^|\n)\s*[-*_]{3,}\s*(?:\n|$)/g, '. ');

    // 7. Normalize Line Breaks
    // Convert newlines to periods to ensure the speech engine pauses between lines
    clean = clean.replace(/\n+/g, '. ');

    // 8. Cleanup Punctuation and Spacing
    // Collapse multiple spaces
    clean = clean.replace(/\s+/g, ' ');

    // Fix spacing around punctuation: " . " -> ". "
    clean = clean.replace(/\s+([.,!?;:])/g, '$1');

    // Ensure a space after punctuation if missing: "Hello.World" -> "Hello. World"
    clean = clean.replace(/([.,!?;:])(?=[a-zA-Z])/g, '$1 ');

    // Collapse repeated periods (e.g. "..") to single "." to avoid "dot dot" reading
    // But preserve "..." (ellipses) if desired? 
    // User requested "No ... extra punctuation". TTS often handles "." best.
    clean = clean.replace(/\.{2,}/g, '.');

    return clean.trim();
};
