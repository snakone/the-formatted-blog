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