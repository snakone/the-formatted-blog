import { NotificationPayload } from '../types/interface.types';

export const WELCOME_PUSH: NotificationPayload = {
  body: 'Bienvenido/a',
  requireInteraction: false,
  actions: [
    { action: 'explore', title: 'Gracias por visitarnos' }
  ],
  broadcast: false
};