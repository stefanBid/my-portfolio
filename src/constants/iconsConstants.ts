import type { FunctionalComponent, Component } from 'vue';
import { PhoneIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import Angular from '@/assets/icons/angular.svg?component';
import CSharp from '@/assets/icons/c-sharp.svg?component';
import Css from '@/assets/icons/css.svg?component';
import Github from '@/assets/icons/github.svg?component';
import Graphql from '@/assets/icons/graphql.svg?component';
import Hibernate from '@/assets/icons/hibernate.svg?component';
import Html from '@/assets/icons/html.svg?component';
import Instagram from '@/assets/icons/instagram.svg?component';
import Italy from '@/assets/icons/it-flag.svg?component';
import Js from '@/assets/icons/java-script.svg?component';
import Java from '@/assets/icons/java.svg?component';
import Linkedin from '@/assets/icons/linkedin.svg?component';
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
  | 'GithubIcon'
  | 'GraphqlIcon'
  | 'HibernateIcon'
  | 'HtmlIcon'
  | 'InstagramIcon'
  | 'ItalyIcon'
  | 'JsIcon'
  | 'JavaIcon'
  | 'LinkedinIcon'
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
  GithubIcon: Github,
  GraphqlIcon: Graphql,
  HibernateIcon: Hibernate,
  HtmlIcon: Html,
  InstagramIcon: Instagram,
  ItalyIcon: Italy,
  JsIcon: Js,
  JavaIcon: Java,
  LinkedinIcon: Linkedin,
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

export const CONTACT_CHANNEL_ICONS: Record<string, FunctionalComponent | Component | string> = {
  MobileIcon: DevicePhoneMobileIcon,
  TelephoneIcon: PhoneIcon,
  EmailIcon: EnvelopeIcon,
  InstagramIcon: ICONS.InstagramIcon,
  GithubIcon: ICONS.GithubIcon,
  LinkedinIcon: ICONS.LinkedinIcon,
};
