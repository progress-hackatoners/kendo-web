import { Size } from '../enums/size';
import { Rounded } from '../enums/rounded';
import { FillMode } from '../enums/fillmode';
import { ThemeColor } from '../enums/themecolor';
import { StyleOption } from '../enums/styleoption';
export function sizingoptions() {
    return function (target) {
        target.prototype.getPrefixed = function (val, options = {}) {
            return val ? `${options.prefix || this.wrapperPrefix}${val}` : '';
        };
        target.prototype.updateStyleOptions = function (op, val, old) {
            let themeColorOld;
            let themeColorNew;
            switch (op) {
                case StyleOption.Size:
                    old = this.getPrefixed(Size[old]);
                    val = this.getPrefixed(Size[val]);
                    break;
                case StyleOption.Rounded:
                    old = this.getPrefixed(Rounded[old], { prefix: this.roundedPrefix });
                    val = this.getPrefixed(Rounded[val], { prefix: this.roundedPrefix });
                    break;
                case StyleOption.FillMode:
                    old = this.getPrefixed(FillMode[old]);
                    val = this.getPrefixed(FillMode[val]);
                    themeColorOld = this.getPrefixed(ThemeColor[this.themeColor], { prefix: `${old}-` });
                    themeColorNew = this.getPrefixed(ThemeColor[this.themeColor], { prefix: `${val}-` });
                    break;
                case StyleOption.ThemeColor:
                    old = this.getPrefixed(ThemeColor[old], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` });
                    val = this.getPrefixed(ThemeColor[val], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` });
                    break;
            }
            if (old) {
                this.classList.remove(old);
            }
            if (val) {
                this.classList.add(val);
            }
            if (themeColorOld) {
                this.classList.remove(themeColorOld);
            }
            if (themeColorNew) {
                this.classList.add(themeColorNew);
            }
        };
    };
}
