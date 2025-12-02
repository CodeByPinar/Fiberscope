
/**
 * AI Engine (Mock / Prototype)
 * Simulates the "Intent Parsing LLM" and "Action Plan Generator" modules.
 * 
 * In a real production environment, this would call an OpenAI/Anthropic API
 * with the component metadata and user prompt.
 */

export async function processAiPrompt(prompt, componentData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerPrompt = prompt.toLowerCase();
    const actions = [];

    // --- Heuristic / Rule-Based Intent Parsing (Mocking AI) ---

    // 1. Color / Style Changes
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'orange', 'pink'];
    const foundColor = colors.find(c => lowerPrompt.includes(c));
    
    if (foundColor) {
        if (lowerPrompt.includes('background') || lowerPrompt.includes('bg')) {
            actions.push({
                type: 'style',
                key: 'backgroundColor',
                value: foundColor
            });
        } else {
            actions.push({
                type: 'style',
                key: 'color',
                value: foundColor
            });
        }
    }

    // 2. Size Changes (Prop mapping)
    if (lowerPrompt.includes('big') || lowerPrompt.includes('large') || lowerPrompt.includes('büyük')) {
        actions.push({ type: 'prop', key: 'size', value: 'lg' });
        // Also try style just in case
        actions.push({ type: 'style', key: 'fontSize', value: '24px' });
        actions.push({ type: 'style', key: 'padding', value: '16px 32px' });
    }
    
    if (lowerPrompt.includes('small') || lowerPrompt.includes('little') || lowerPrompt.includes('küçük')) {
        actions.push({ type: 'prop', key: 'size', value: 'sm' });
        actions.push({ type: 'style', key: 'fontSize', value: '12px' });
        actions.push({ type: 'style', key: 'padding', value: '4px 8px' });
    }

    // 3. Text Content
    // "change text to Hello World" -> "Hello World"
    // "metni değiştir: Merhaba" -> "Merhaba"
    if (lowerPrompt.includes('text') || lowerPrompt.includes('metin') || lowerPrompt.includes('yazı')) {
        // Simple extraction: take everything after "to" or ":"
        const match = prompt.match(/(?:to|:|yap|olsun)\s+(.*)/i);
        if (match && match[1]) {
            const newText = match[1].trim();
            actions.push({ type: 'prop', key: 'children', value: newText });
            actions.push({ type: 'prop', key: 'label', value: newText }); // Try common props
            actions.push({ type: 'prop', key: 'text', value: newText });
        }
    }

    // 4. Border / Radius
    if (lowerPrompt.includes('round') || lowerPrompt.includes('yuvarlak')) {
        actions.push({ type: 'style', key: 'borderRadius', value: '999px' });
    }
    
    if (lowerPrompt.includes('border') || lowerPrompt.includes('kenarlık')) {
         actions.push({ type: 'style', key: 'border', value: '2px solid #A56FFF' });
    }

    // Default fallback if no keywords found but prompt exists
    if (actions.length === 0 && prompt.length > 0) {
        // Assume it's a text update if nothing else matches
        actions.push({ type: 'prop', key: 'children', value: prompt });
    }

    return {
        success: true,
        actions: actions
    };
}
