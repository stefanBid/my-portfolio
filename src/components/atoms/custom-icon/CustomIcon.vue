<script setup lang="ts">
import AngularIcon from '@/assets/icons/angular.svg';
import ReactIcon from '@/assets/icons/react.svg';
import VueIcon from '@/assets/icons/vue.svg';
import ItalyFlagIcon from '@/assets/icons/it-flag.svg';
import EnglandFlagIcon from '@/assets/icons/en-flag.svg';

type IconName = 'AngularSBIcon' | 'ReactSBIcon' | 'VueSBIcon' | 'ItalyFlagSBIcon' | 'EnglandFlagSBIcon';

interface CustomIconProps {
  name: IconName;
}

const props = defineProps<CustomIconProps>();

const ICON_MAP = {
	AngularSBIcon: AngularIcon,
	ReactSBIcon: ReactIcon,
	VueSBIcon: VueIcon,
	ItalyFlagSBIcon: ItalyFlagIcon,
	EnglandFlagSBIcon: EnglandFlagIcon,
};
</script>

<template>
  <div
    class="inline-flex items-center"
    v-bind="$attrs"
  >
    <component
      :is="ICON_MAP[props.name]"
    />
  </div>
</template>