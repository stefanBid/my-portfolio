// assets/index.ts (Assets Barrel Export File)

import AngularIcon from './icons/angular.svg?component';
import CSharpIcon from './icons/c-sharp.svg?component';
import CssIcon from './icons/css.svg?component';
import GraphqlIcon from './icons/graphql.svg?component';
import HibernateIcon from './icons/hibernate.svg?component';
import HtmlIcon from './icons/html.svg?component';
import ItalyIcon from './icons/it-flag.svg?component';
import JsIcon from './icons/java-script.svg?component';
import JavaIcon from './icons/java.svg?component';
import MysqlIcon from './icons/mysql.svg?component';
import PythonIcon from './icons/python.svg?component';
import ReactIcon from './icons/react.svg?component';
import RocketIcon from './icons/rocket.svg?component';
import SpringIcon from './icons/spring.svg?component';
import TsIcon from './icons/type-script.svg?component';
import UkIcon from './icons/uk-flag.svg?component';
import VueIcon from './icons/vue.svg?component';

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
  PythonIcon,
  ReactIcon,
  SpringIcon,
  TsIcon,
  VueIcon,
};

type SkillIcon = keyof typeof SKILLS_ICONS_MAP;

export { RocketIcon, ItalyIcon, UkIcon, SKILLS_ICONS_MAP, type SkillIcon };
