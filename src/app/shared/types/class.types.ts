import { DraftSideBarSettings } from "./interface.user";
import { DraftSidebarSettingsEnum, ThemeEnum, ThemeType } from "./types.enums";

export class MasonryType {
    public layout!: () => void;
    public appended!: (els: Element[]) => void;
    public prepended!: (els: Element[]) => void;
    public remove!: (els: Element[]) => void;
}

export class UserProfile {
  constructor(
    public role: string = '',
    public bio: string = 'Escribe algo sobre ti',
    public twitter: string = '',
    public github: string = '',
    public portfolio: string = '',
    public location: string = ''
  ) { }
}

export class UserSettings {
  constructor(
    public theme: ThemeType = ThemeEnum.LIGHT,
    public autoLogin: boolean = true,
    public refreshToken: boolean = true,
    public rememberEmail: boolean = true,
    public autoSave: boolean = true,
    public draftSidebar: DraftSideBarSettings = { 
      fixed: false, 
      state: DraftSidebarSettingsEnum.EXPANDED
    }
  ) { }
}