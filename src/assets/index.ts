import AngularIcon from '@/assets/icons/angular.svg';
import CodeIcon from '@/assets/icons/coding.svg';
import CSharpIcon from '@/assets/icons/c-sharp.svg';
import CssIcon from '@/assets/icons/css.svg';
import GraphqlIcon from '@/assets/icons/graphql.svg';
import HibernateIcon from '@/assets/icons/hibernate.svg';
import HtmlIcon from '@/assets/icons/html.svg';
import ItalyIcon from '@/assets/icons/it-flag.svg';
import JsIcon from '@/assets/icons/java-script.svg';
import JavaIcon from '@/assets/icons/java.svg';
import MysqlIcon from '@/assets/icons/mysql.svg';
import ReactIcon from '@/assets/icons/react.svg';
import SpringIcon from '@/assets/icons/spring.svg';
import TsIcon from '@/assets/icons/type-script.svg';
import UkIcon from '@/assets/icons/uk-flag.svg';
import VueIcon from '@/assets/icons/vue.svg';
import ImgPreview from '@/assets/icons/img-pre.svg';


const SKILLS_ICONS_MAP = {
  AngularIcon,
  CSharpIcon,
  CssIcon,
  GraphqlIcon,
  HibernateIcon,
  HtmlIcon,
  JsIcon,
  JavaIcon,
  MysqlIcon,
  ReactIcon,
  SpringIcon,
  TsIcon,
  VueIcon,
};


type SkillIcon = keyof typeof SKILLS_ICONS_MAP;

export {  CodeIcon, ItalyIcon, UkIcon, ImgPreview, SKILLS_ICONS_MAP, type SkillIcon };


