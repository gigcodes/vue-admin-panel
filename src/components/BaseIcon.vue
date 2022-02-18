<template>
  <component
      :is="iconComponent"
      :active="active"
  />
</template>

<script>

import AnalyticsIcon from "./icons/AnalyticsIcon.vue";
import DashboardIcon from "./icons/DashboardIcon.vue";
import ListIcon from "./icons/ListIcon.vue";
import CommerceIcon from "./icons/CommerceIcon";
import AuthenticationIcon from "./icons/AuthenticationIcon";
import CampaignIcon from "./icons/CampaignIcon";
import InboxIcon from "./icons/InboxIcon";
import LoadingIcon from "./icons/LoadingIcon";
import MessageIcon from "./icons/MessageIcon";
import TaskIcon from "./icons/TaskIcon";
import TeamIcon from "./icons/TeamIcon";
import UtilityIcon from "./icons/UtilityIcon";
import SettingIcon from "./icons/SettingIcon";
import OnboardIcon from "./icons/OnboardIcon";
import CalendarIcon from "./icons/CalendarIcon";
import ComponentIcon from "./icons/ComponentIcon";

const icons = {
  analytics: AnalyticsIcon,
  dashboard: DashboardIcon,
  list: ListIcon,
  commerce: CommerceIcon,
  authentication : AuthenticationIcon,
  campaign: CampaignIcon,
  inbox: InboxIcon,
  loading: LoadingIcon,
  message: MessageIcon,
  task: TaskIcon,
  team: TeamIcon,
  utility: UtilityIcon,
  setting: SettingIcon,
  onboard: OnboardIcon,
  calendar: CalendarIcon,
  component: ComponentIcon
}

export default {
  name: 'BaseIcon',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(icons, value)
      }
    }
  },

  computed: {
    iconComponent() {
      return icons[this.name]
    }
  }
}
</script>
