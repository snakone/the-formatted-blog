export class MasonryType {
    public layout!: () => void;
    public appended!: (els: Element[]) => void;
    public prepended!: (els: Element[]) => void;
    public remove!: (els: Element[]) => void;
}