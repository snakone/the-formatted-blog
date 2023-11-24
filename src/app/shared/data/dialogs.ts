import { DraftPreviewDialogComponent } from "@shared/layout/overlays/draft-preview/draft-preview.component";
import { EditProfileDialogComponent } from "@shared/layout/overlays/edit-profile/edit-profile.component";
import { LogInOverlayComponent } from "@shared/layout/overlays/log-in/log-in.component";
import { PushDeniedOverlayComponent } from "@shared/layout/overlays/push-denied/push-denied.component";
import { QuillHelpComponent } from "@shared/layout/overlays/quill-help/quill-help.component";
import { ConfirmationDialogProps, FormattedDialog } from "@shared/types/interface.app";
import { Post } from "@shared/types/interface.post";
import { User } from "@shared/types/interface.user";

export const SAVE_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Nuevo...',
  message: '¿Quieres guardar el boceto actual y crear uno nuevo?'
};

export const DELETE_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Eliminar...',
  message: '¿Estás seguro que quieres eliminar este boceto?'
};

export const PUBLISH_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Publicar...',
  message: '¿Estás seguro que quieres publicar este boceto?'
};

export const EDIT_POST_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Editar artículo...',
  message: '¿Estás seguro que quieres editar este artículo? Recuerda que si lo editas, volverá al estado de boceto.'
};

export const REMOVE_FRIEND_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Eliminar amigo...',
  message: '¿Estás seguro que quieres eliminar a este usuario de tu lista de amigos?'
};

export const PREVIEW_DRAFT_DIALOG: FormattedDialog<DraftPreviewDialogComponent> = {
  component: DraftPreviewDialogComponent,
  css: 'preview'
};

export const QUILL_HELP_DIALOG: FormattedDialog<QuillHelpComponent> = {
  component: QuillHelpComponent,
  css: 'quill-help'
};

export const PREVIEW_DRAFT_DIALOG_UPDATE = (draft: Post): FormattedDialog<DraftPreviewDialogComponent> => ({
  component: DraftPreviewDialogComponent,
  css: 'preview',
  data: {
    updateStatus: true,
    draft
  }
});

export const LOGIN_DIALOG: FormattedDialog<LogInOverlayComponent> = {
  component: LogInOverlayComponent,
  id: 'login', 
  css: 'login-overlay'
};

export const EDIT_PROFILE_DIALOG = (user: User): FormattedDialog<EditProfileDialogComponent> => ({
  component: EditProfileDialogComponent,
  data: {
    user
  },
  css: 'edit-profile'
});

export const PUSH_DENIED_DIALOG: FormattedDialog<PushDeniedOverlayComponent> = {
  component: PushDeniedOverlayComponent
}