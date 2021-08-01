import { exit } from "process";
import CSS from "../css/css";

export default class Loader {
  postcss = require('postcss');
  shorthandExpand = require('postcss-shorthand-expand');
  validator = require('csstree-validator');
  fs = require('fs');
  cssbeautify = require('cssbeautify');

  constructor(
    public inputPath: string
  ) { }

  scan() {
    var data: string = '';
    try {
      data = this.fs.readFileSync(this.inputPath, 'utf8');
      data = this.cssbeautify(data, {
        indent: '  ',
        openbrace: 'separate-line',
        autosemicolon: true
      });
    }
    catch (err) {
      console.error(err);
    }

    var validated = this.validate(data);
    if (validated == 1) {

      var cleared = this.clearComments(data);
      var constructed = this.construct(cleared);
      return constructed;
    }
    else {
      console.log('The css is not valid');
      exit();
    }

  }

  validate(data: string) {
    var result = this.validator.validate(data);
    console.log(result.length)
    if (result.length == 0) {
      return 1;
    }
    else {
      console.log('The css file is not valid');
      return 0;
    }
  }

  clearComments(data: any) {
    console.log('clear comment');

    var start = data.indexOf('/*');
    if (start != -1) {
      var end = data.indexOf('*/');
      data = data.substring(0, start - 1) + data.substring(end + 2, data.length);
      this.clearComments(data);
      return data;
    }
    else {
      return data;

    }
  }

  construct(data: string) {
    data = this.postcss([this.shorthandExpand()]).process(data).css;

    var nonMediaTagProp: any = [];
    var mediaTagProp: any = [];
    for (var i = 0; i < data.length; i++) {
      var tag = '';
      var property = '';
      if (data.charAt(i) == '{') {
        var j = i - 1;
        while (data.charAt(j) != '}' && j >= 0) {
          tag = tag + data.charAt(j);
          j--;
        }
        if (!reverseString(tag).includes('@')) {
          tag = reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim();
          if (tag.includes(',')) {
            var tags = tag.split(',');
            var k = i;
            for (var t in tags) {
              while (data.charAt(k - 1) != '}') {
                property = property + data.charAt(k);
                k++;
              }
              property = property.replace('{', '').replace('}', '').trim() + ';';
              if (Object.keys(nonMediaTagProp).includes(tags[t].trim())) {
                var oldProp = nonMediaTagProp[tags[t]];
                var newProp = oldProp + property;
                nonMediaTagProp[tags[t]] = newProp;
              }
              else {
                nonMediaTagProp[tags[t]] = property;
              }
            }
            tag = '';
            property = '';
          }
          else {
            var k = i;
            while (data.charAt(k - 1) != '}') {
              property = property + data.charAt(k);
              k++;
            }
            property = property.replace('{', '').replace('}', '').trim() + ';';
            if (Object.keys(nonMediaTagProp).includes(tag.trim())) {
              var oldProp = nonMediaTagProp[tag];
              var newProp = oldProp + property;
              nonMediaTagProp[tag] = newProp;
            }
            else {
              nonMediaTagProp[tag] = property;
            }
            tag = '';
            property = '';
          }
        }
        else {
          var opentag = 0;
          var closetag = 0;
          var j = i;
          while (j < data.length) {
            property = property + data[j];
            if (data[j] == '{') { opentag++; }
            else if (data[j] == '}') { closetag++; }
            if (opentag == closetag) {
              tag = reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim();
              if (Object.keys(mediaTagProp).includes(tag.trim())) {
                var oldProp = mediaTagProp[tag];
                var newProp = oldProp + property.substring(1, property.length - 2);
                mediaTagProp[tag] = newProp;
              }
              else {
                mediaTagProp[tag] = property.substring(1, property.length - 2);
              }
              opentag = 0;
              closetag = 0;
              tag = '';
              property = '';
              i = j + 1;
              break;
            }
            j++;
          }
        }
      }
    }
    const result = [nonMediaTagProp, mediaTagProp];
    return result;
  }
}








//**********************************************helper functions***********************************************


function reverseString(str: string) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}
