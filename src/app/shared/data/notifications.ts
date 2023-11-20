import { NotificationPayload } from "@shared/types/interface.app";

export const WELCOME_PUSH: NotificationPayload = {
  body: 'Bienvenido/a',
  requireInteraction: false,
  actions: [
    { action: 'explore', title: 'Gracias por visitarnos' }
  ],
  broadcast: false,
  data: {}
};

export const DRAFT_PUSH: NotificationPayload = {
  body: 'Nuevo boceto publicado',
  requireInteraction: false,
  actions: [
    { action: 'explore', title: 'Entendido' }
  ],
  broadcast: false,
  admin: true,
  data: {}
};

export const PUBLISH_PUSH: NotificationPayload = {
  body: 'Nuevo artículo publicado',
  requireInteraction: true,
  actions: [
    { action: 'explore', title: 'Ver Artículo' }
  ],
  broadcast: false,
  admin: true,
  data: {}
};