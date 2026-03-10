import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Provides tactile feedback for mobile devices via Capacitor.
 * Safely handles environments where Capacitor is not available (like a web browser).
 */
export const haptics = {
    /**
     * Triggers a light impact (standard for button clicks/navigation)
     */
    light: async () => {
        try {
            await Haptics.impact({ style: ImpactStyle.Light });
        } catch (e) {
            // Ignore if not on a mobile device
        }
    },

    /**
     * Triggers a medium impact (for successful completions/misions)
     */
    medium: async () => {
        try {
            await Haptics.impact({ style: ImpactStyle.Medium });
        } catch (e) {
            // Ignore
        }
    },

    /**
     * Triggers a success notification pattern
     */
    success: async () => {
        try {
            await Haptics.notification({ type: 'SUCCESS' as any });
        } catch (e) {
            // Ignore
        }
    },

    /**
     * Triggers a short vibration
     */
    vibrate: async () => {
        try {
            await Haptics.vibrate();
        } catch (e) {
            // Ignore
        }
    }
};
