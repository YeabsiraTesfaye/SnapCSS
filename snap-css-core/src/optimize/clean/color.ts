export const rules = ['color', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-color',
    'border-top-color', 'text-shadow', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'background-color', 'outline', 'outline-color', 'border-block-end', 'border-block-end-color', 'outline', 'box-shadow']

export function converter(color: any) {
    const result = [];
    if (color[0].includes('color')) {

        if (color[1].includes('rgba')) {
            const rgbaVal = color[1].substring(color[1].indexOf('rgba'), color[1].indexOf(')') + 1);
            const hexVal = RGBAToHexA(rgbaVal);
            color[1] = color[1].replace(rgbaVal, hexVal)
            result[color[0]] = color[1];
        }
        else if (color[1].includes('rgb')) {
            const rgbaVal = color[1].substring(color[1].indexOf('rgba'), color[1].indexOf(')') + 1);
            const hexVal = RGBAToHexA(rgbaVal);
            color[1] = color[1].replace(rgbaVal, hexVal)
            result[color[0]] = color[1];
        }
        else {
            if (!color[1].includes('!important')) {
                if (colourNameToHex(color[1].trim()) != false) {
                    result[color[0]] = colourNameToHex(color[1].trim());
                }
                else if (color[1].includes('#') && color[1].trim().split('').length == 4) {
                    const hex6 = color[1].split("").map((item: any) => {
                        if (item == "#") { return item }
                        return item + item;
                    }).join("")
                    result[color[0]] = hex6.toString()
                }
                else {
                    result[color[0]] = color[1];
                }
            }
            else {
                const splited = color[1].trim().split(' ');
                if (colourNameToHex(splited[0]) != false) {
                    splited[0] = colourNameToHex(splited[0]);
                    result[color[0]] = splited.join(' ');
                }
                else if (splited[0].includes('#') && splited[0].trim().split('').length == 4) {
                    const hex6 = splited[0].split("").map((item: any) => {
                        if (item == "#") { return item }
                        return item + item;
                    }).join("")
                    splited[0] = hex6.toString();
                    result[color[0]] = splited.join(' ');
                }
                else {
                    result[color[0]] = color[1];
                }
            }
        }
        return result

    }
    if (rules.includes(color[0])) {
        const result = [];
        if (color[1].includes('rgba')) {
            const rgbaVal = color[1].substring(color[1].indexOf('rgba'), color[1].indexOf(')') + 1);
            const hexVal = RGBAToHexA(rgbaVal);
            color[1] = color[1].replace(rgbaVal, hexVal)
            result[color[0]] = color[1];
        }
        else if (color[1].includes('rgb')) {
            const rgbVal = color[1].substring(color[1].indexOf('rgb'), color[1].indexOf(')') + 1);
            const hexVal = RGBToHex(rgbVal);
            color[1] = color[1].replace(rgbVal, hexVal)
            result[color[0]] = color[1];
        }
        else {
            let splited = color[1].trim().split(' ');

            if (!color[1].includes('!important')) {
                if (colourNameToHex(splited[splited.length - 1].trim()) != false) {
                    splited[splited.length - 1] = colourNameToHex(splited[splited.length - 1].trim())
                    result[color[0]] = splited.join(' ')
                }
                else if (splited[splited.length - 1].includes('#') && splited[splited.length - 1].split('').length == 4) {

                    const hex6 = splited[splited.length - 1].split("").map((item: any) => {
                        if (item == "#") { return item }
                        return item + item;
                    }).join("")
                    splited[splited.length - 1] = hex6.toString();
                    result[color[0]] = splited.join(' ')
                }
                else {
                    result[color[0]] = color[1]
                }
            }
            else {
                if (colourNameToHex(splited[splited.length - 2].trim()) != false) {
                    splited[splited.length - 2] = colourNameToHex(splited[splited.length - 2].trim())
                    result[color[0]] = splited.join(' ')
                }
                else if (splited[splited.length - 2].includes('#') && splited[splited.length - 2].trim().split('').length == 4) {
                    const hex6 = splited[splited.length - 2].split("").map((item: any) => {
                        if (item == "#") { return item }
                        return item + item;
                    }).join("")
                    splited[splited.length - 2] = hex6.toString();
                    result[color[0]] = splited.join(' ');
                }
                else {
                    result[color[0]] = color[1]
                }
            }
        }
        return result
    }
}


function colourNameToHex(colour: any) {
    let colours: any = {
        "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080",
        "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"
    };
    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];
    return false;
}
function RGBAToHexA(rgba: any) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);
    if (rgba.indexOf("/") > -1)
        rgba.splice(3, 1);

    for (let R in rgba) {
        let r = rgba[R];
        if (r.indexOf("%") > -1) {
            let p = r.substr(0, r.length - 1) / 100;

            if (parseInt(R) < 3) {
                rgba[R] = Math.round(p * 255);
            } else {
                rgba[R] = p;
            }
        }
    }

    let r = (+rgba[0]).toString(16),
        g = (+rgba[1]).toString(16),
        b = (+rgba[2]).toString(16),
        a = Math.round(+rgba[3] * 255).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    if (a.length == 1)
        a = "0" + a;

    return "#" + r + g + b + a;
}
function RGBToHex(rgb: any) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
    for (let R in rgb) {
        let r = rgb[R];
        if (r.indexOf("%") > -1)
            rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
    }
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}
