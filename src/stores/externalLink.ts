import { defineStore } from "pinia";
import type { ExternalLinkItem } from "@/types";
import { ExternalLinkType } from "@/types";
export const useExternalLinkStore = defineStore({
    id: 'externalLinkStore',
    state: () => ({
        links: [
            {label:ExternalLinkType.CV_LINK_LABEL, url:"https://drive.google.com/file/d/1wuibB821wePCKiF6Uy66dn623g7eW39g/view?usp=share_link"},
            {label:ExternalLinkType.GITHUB_LINK_LABEL, url:"https://github.com/stefanBid"},
            {label:ExternalLinkType.LINKEDIN_LINK_LABEL, url:"https://www.linkedin.com/in/stefano-biddau-669149214/"},
            {label:ExternalLinkType.INSTAGRAM_LINK_LABEL, url:"https://www.instagram.com/stefano_bid/"},
            {label:ExternalLinkType.GUESS_MY_NUMBER_REPO_LINK_LABEL, url:"https://github.com/stefanBid/Guess-My-Number"},
            {label:ExternalLinkType.GUESS_MY_NUMBER_PLAY_LINK_LABEL, url:"https://stefanbid.github.io/Guess-My-Number/"},
            {label:ExternalLinkType.PIG_GAME_REPO_LINK_LABEL, url:"https://github.com/stefanBid/Pig-Game"},
            {label:ExternalLinkType.PIG_GAME_PLAY_LINK_LABEL, url:"https://stefanbid.github.io/Pig-Game/"},
            {label:ExternalLinkType.IMAGE_CLASSIFICATION_REPO_LINK_LABEL, url:"https://github.com/stefanBid/Classificazione-Immagini"},
        ] as  ExternalLinkItem[]
    }),
    getters:{
        getUrlByName: (state)=>{
            return (urlType:string) => state.links.find((url:ExternalLinkItem) =>url.label === urlType)?.url;
        }
    }
});
