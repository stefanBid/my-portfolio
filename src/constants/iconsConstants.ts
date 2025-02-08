import { type FunctionalComponent } from 'vue';
import Angular from '@/assets/icons/angular.svg?component';
import CSharp from '@/assets/icons/c-sharp.svg?component';
import Css from '@/assets/icons/css.svg?component';
import Graphql from '@/assets/icons/graphql.svg?component';
import Hibernate from '@/assets/icons/hibernate.svg?component';
import Html from '@/assets/icons/html.svg?component';
import Italy from '@/assets/icons/it-flag.svg?component';
import Js from '@/assets/icons/java-script.svg?component';
import Java from '@/assets/icons/java.svg?component';
import Mysql from '@/assets/icons/mysql.svg?component';
import Python from '@/assets/icons/python.svg?component';
import React from '@/assets/icons/react.svg?component';
import Rocket from '@/assets/icons/rocket.svg?component';
import Spring from '@/assets/icons/spring.svg?component';
import Ts from '@/assets/icons/type-script.svg?component';
import Uk from '@/assets/icons/uk-flag.svg?component';
import Vue from '@/assets/icons/vue.svg?component';

export type IconName =
  | 'AngularIcon'
  | 'CSharpIcon'
  | 'CssIcon'
  | 'GraphqlIcon'
  | 'HibernateIcon'
  | 'HtmlIcon'
  | 'ItalyIcon'
  | 'JsIcon'
  | 'JavaIcon'
  | 'MysqlIcon'
  | 'PythonIcon'
  | 'ReactIcon'
  | 'RocketIcon'
  | 'SpringIcon'
  | 'TsIcon'
  | 'UkIcon'
  | 'VueIcon';

export const ICONS: Record<IconName, FunctionalComponent> = {
  AngularIcon: Angular,
  CSharpIcon: CSharp,
  CssIcon: Css,
  GraphqlIcon: Graphql,
  HibernateIcon: Hibernate,
  HtmlIcon: Html,
  ItalyIcon: Italy,
  JsIcon: Js,
  JavaIcon: Java,
  MysqlIcon: Mysql,
  PythonIcon: Python,
  ReactIcon: React,
  RocketIcon: Rocket,
  SpringIcon: Spring,
  TsIcon: Ts,
  UkIcon: Uk,
  VueIcon: Vue,
};

const SKILL_ICON_NAMES: IconName[] = [
  'AngularIcon',
  'CSharpIcon',
  'CssIcon',
  'GraphqlIcon',
  'HibernateIcon',
  'HtmlIcon',
  'JsIcon',
  'JavaIcon',
  'MysqlIcon',
  'PythonIcon',
  'ReactIcon',
  'SpringIcon',
  'TsIcon',
  'VueIcon',
];

export const SKILL_ICONS: Record<IconName, FunctionalComponent> = Object.fromEntries(
  SKILL_ICON_NAMES.map((name) => [name, ICONS[name]]),
) as Record<IconName, FunctionalComponent>;
