import { ElementRef } from "@angular/core";

export type BoardTypes = {
    app: ElementRef<HTMLDivElement>,
    cols: ElementRef<HTMLDivElement>,
    rows: ElementRef<HTMLDivElement>,
    board: ElementRef<HTMLDivElement>,
    lives: ElementRef<HTMLParagraphElement>
    result: ElementRef<HTMLParagraphElement>
    reset: ElementRef<HTMLParagraphElement>
};