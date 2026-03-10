import { LocalNotifications } from '@capacitor/local-notifications';

/**
 * Utility for managing local notifications in SentIA.
 */
export const notifications = {
    /**
     * Requests permission to show notifications.
     * Standard procedure for mobile apps.
     */
    requestPermissions: async () => {
        try {
            const { display } = await LocalNotifications.requestPermissions();
            return display === 'granted';
        } catch (e) {
            console.error('Error requesting notification permissions:', e);
            return false;
        }
    },

    /**
     * Schedules a daily reminder at 8:00 PM.
     */
    scheduleDailyReminder: async () => {
        try {
            // Clear existing notifications of this type first to avoid duplicates
            await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: "SentIA: Un momento para ti",
                        body: "¿Cómo te sientes hoy? Tómate un minuto para reflexionar y desahogarte.",
                        id: 1,
                        schedule: {
                            on: { hour: 20, minute: 0 },
                            repeats: true,
                            allowWhileIdle: true
                        },
                        sound: 'default',
                        attachments: [],
                        actionTypeId: "",
                        extra: null
                    }
                ]
            });
            return true;
        } catch (e) {
            console.error('Error scheduling daily reminder:', e);
            return false;
        }
    },

    /**
     * Cancels all scheduled notifications.
     */
    cancelAll: async () => {
        try {
            const { notifications } = await LocalNotifications.getPending();
            if (notifications.length > 0) {
                await LocalNotifications.cancel({ notifications });
            }
        } catch (e) {
            console.error('Error cancelling notifications:', e);
        }
    }
};
