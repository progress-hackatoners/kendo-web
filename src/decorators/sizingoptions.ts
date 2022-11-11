import { Size } from '../enums/size';
import { Rounded } from '../enums/rounded';
import { FillMode } from '../enums/fillmode';
import { ThemeColor } from '../enums/themecolor';
import { StyleOption } from '../enums/styleoption';

import type { SizeKey } from '../enums/size';
import type { RoundedKey } from '../enums/rounded';
import type { FillModeKey } from '../enums/fillmode';
import type { ThemeColorKey } from '../enums/themecolor';

export function sizingoptions() {
    return function (target: any) {
        target.prototype.getPrefixed = function(val: string, options: { prefix?: string } = {}) {
            return val ? `${options.prefix || this.wrapperPrefix}${val}` : '';
        }

        target.prototype.updateStyleOptions = function(op: StyleOption, val: string, old: string) {
            let themeColorOld: string;
            let themeColorNew: string;
    
            switch (op) {
                case StyleOption.Size:
                    old = this.getPrefixed(Size[old as SizeKey]);
                    val = this.getPrefixed(Size[val as SizeKey]);
                    break;
                case StyleOption.Rounded:
                    old = this.getPrefixed(Rounded[old as RoundedKey], { prefix: this.roundedPrefix });
                    val = this.getPrefixed(Rounded[val as RoundedKey], { prefix: this.roundedPrefix });
                    break;
                case StyleOption.FillMode:
                    old = this.getPrefixed(FillMode[old as FillModeKey]);
                    val = this.getPrefixed(FillMode[val as FillModeKey]);
                    themeColorOld = this.getPrefixed(ThemeColor[this.themeColor as ThemeColorKey], { prefix: `${old}-` });
                    themeColorNew = this.getPrefixed(ThemeColor[this.themeColor as ThemeColorKey], { prefix: `${val}-` });
                    break;
                case StyleOption.ThemeColor:
                    old = this.getPrefixed(ThemeColor[old as ThemeColorKey], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` });
                    val = this.getPrefixed(ThemeColor[val as ThemeColorKey], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` });
                    break;
            }
    
            if (old) {
                this.classList.remove(old);
            }
    
            if (val) {
                this.classList.add(val);
            }
           
            if (themeColorOld!) {
                this.classList.remove(themeColorOld);
            } 
    
            if (themeColorNew!) {
                this.classList.add(themeColorNew);
            } 
        } 
    };
}