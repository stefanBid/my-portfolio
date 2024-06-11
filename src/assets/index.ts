import AngularIcon from '@/assets/icons/angular.svg';
import CodeIcon from '@/assets/icons/coding.svg';
import CssIcon from '@/assets/icons/css.svg';
import HtmlIcon from '@/assets/icons/html.svg';
import ItalyIcon from '@/assets/icons/it-flag.svg';
import JsIcon from '@/assets/icons/java-script.svg';
import ReactIcon from '@/assets/icons/react.svg';
import TsIcon from '@/assets/icons/type-script.svg';
import UkIcon from '@/assets/icons/uk-flag.svg';
import VueIcon from '@/assets/icons/vue.svg';


const ICONS_MAP = {
  AngularIcon,
  CodeIcon,
  CssIcon,
  HtmlIcon,
  ItalyIcon,
  JsIcon,
  ReactIcon,
  TsIcon,
  UkIcon,
  VueIcon
};


type CustomIcon = keyof typeof ICONS_MAP;

export { AngularIcon, CodeIcon, CssIcon, HtmlIcon, ItalyIcon, JsIcon, ReactIcon, TsIcon, UkIcon, VueIcon, ICONS_MAP, type CustomIcon };


