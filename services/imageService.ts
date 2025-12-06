/**
 * Get image URL for a baby item word
 * Uses local images from the /images folder
 */
export const generateImage = async (word: string): Promise<string> => {
    // Map words to their image filenames
    const imageMap: Record<string, string> = {
        'RATTLE': '/images/rattle.jpg',
        'DIAPER': '/images/diaper.jpg',
        'CRIB': '/images/crib.jpg',
        'STROLLER': '/images/stroller.jpg',
        'BLESSINGS': '/images/blessings.png',
        'BOTTLE': '/images/bottle.jpg',
        'TEDDY': '/images/teddy.jpg',
        'NAPKIN': '/images/napkin.jpg',
        'PACIFIER': '/images/pacifier.jpg',
        'BLANKET': '/images/blanket.jpg',
    };

    // Return the image path for the word, or a fallback
    return imageMap[word.toUpperCase()] || '/images/placeholder.jpg';
};
