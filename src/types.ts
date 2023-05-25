/* eslint-disable no-unused-vars */
/*---- IRTERFACES ----*/

/**
 * # Header Item 🧱
 * @author stefanBid 
 * @interface HeaderItem
 * @description This interface describe the structure of an item that will be displayed in the nav TAG
 * @example
 * // In Vue Component and View like a const variable
 * const headerItem: ref<HeaderItem> = ref({
 *   path: "/about",
 *   name: "about",
 *   label: "About Page"
 * });
 * 
 * // In Vue Component and View like a props
 * headerItem: {
 *  type: Object as PropType<HeaderItem>
 * }
 * 
 * //In Store (Pinia)
 * headerItems:[] as HeaderItem[] 
 */
export interface HeaderItem{
    /**
     * @property {string} path - path of an item.
     * @example HeaderItem.path = "/about"
     */
    path?:string,

    /**
     * @property {string} name - name of an item.
     * @example HeaderItem.name = "about"
     */
    name?: string,

    /**
     * @property {string} label - label of an item.
     * @example HeaderItem.label = "About Page"
     */
    label:string
}


/**
 * # SkillItem 🧱
 * @author stefanBid
 * @interface SkillItem
 * @description This interface describe the structure of a skill.
 * @example
 * // In Vue Component and View like a const variable
 * const skillItem: ref<SkillItem> = ref({
 *  icon: "fab fa-html5",
 *  name: "HTML",
 *  category: "Frontend",
 *  description: "HTML5 is a markup language used for structuring and presenting content on the World Wide Web.",
 *  level: 5
 * });
 * 
 * // In Vue Component and View like a props
 * skillItem: {
 *   type: Object as PropType<SkillItem>
 * }
 * 
 * //In Store (Pinia)
 * skills:[] as SkillItem[]
 */
export interface SkillItem{
    /**
     * @property {string} icon - icon of a skill.
     * @example SkillItem.icon = "fab fa-html5"
     */
    icon:string,

    /**
     * @property {string} name - name of a skill.
     * @example SkillItem.name = "HTML"
     */
    name:string,

    /**
     * @property {string} category - category of a skill.
     * @example SkillItem.category = "Frontend"
     */
    category:string,

    /**
     * @property {string} description - description of a skill.
     * @example SkillItem.description = "HTML5 is a markup language used for structuring and presenting content on the World Wide Web."
     */
    description:string,
    
    /**
     * @property {number} level - level of a skill.
     * @example SkillItem.level = 5
     */
    level:number
}

/**
 * # Project Item 🧱
 * @author stefanBid
 * @interface ProjectItem
 * @description This interface describe the structure of a project.
 * @example
 * // In Vue Component and View like a const variable
 * const projectItem: ref<ProjectItem> = ref({
 *   name: "Guess My Number",
 *   description: "Guess My Number is a game where you have to guess a number between 1 and 20.",
 *   repoLinkLabel: "guess-my-number-repo",
 *   playLinkLabel: "guess-my-number-play"
 * });
 * 
 * // In Vue Component and View like a props
 * projectItem: {
 *  type: Object as PropType<ProjectItem>
 * }
 * 
 * //In Store (Pinia)
 * projects:[] as ProjectItem[]
 */
export interface ProjectItem{
    /**
     * @property {string} name - name of a project.
     * @example ProjectItem.name = "Guess My Number"
     */
    name:string,

    /**
     * @property {string} description - description of a project.
     * @example ProjectItem.description = "Guess My Number is a game where you have to guess a number between 1 and 20."
     */
    description:string,

    /**
     * @property {string} repoLinkLabel - label of a repository link.
     * @example ProjectItem.repoLinkLabel = "guess-my-number-repo"
     */
    repoLinkLabel:string,

    /**
     * @property {string} playLinkLabel - label of a play link.
     * @example ProjectItem.playLinkLabel = "guess-my-number-play"
     */
    playLinkLabel?:string
}

/**
 * # External Link Item 🧱
 * @interface ExternalLinkItem
 * @description This interface describe the structure of an external link.
 * @example
 * // In Vue Component and View like a const variable
 * const externalLinkItem: ref<ExternalLinkItem> = ref({
 *  url: "https://www.google.com",
 *  label: "Google",
 * });
 * 
 * // In Vue Component and View like a props
 * externalLinkItem: {
 *  type: Object as PropType<ExternalLinkItem>
 * }
 * 
 * //In Store (Pinia)
 * externalLinks:[] as ExternalLinkItem[]
 */
export interface ExternalLinkItem{
    /**
     * @property {string} url - url of an external link (ex: https://www.google.com).
     */
    url:string,

    /**
     * @property {string} label - label of an external link (ex: Google).
     */
    label:string,
}

/*---- ENUMS ----*/

/**
 * # AppButton Type 📋
 * @author stefanBid
 * @enum {string} AppButtonType.
 * @description This enum describe the type of a button. Every type value is a string tha represent the CSS class of the button.
 */
export enum AppButtonType{
    CLASSIC = "classic",
    CLASSIC_MINIMAL = "classic-minimal",
    ROUNDED = "rounded",
    ROUNDED_MINIMAL = "rounded-minimal"
}

/**
 * # Handling Error Type 📋
 * @author stefanBid
 * @enum {number} HandlingError.
 * @description This enum describe the type of an error. Every type value is a number that represent the type of error.
 */
export enum HandlingError{
    ERR_NETWORK = "ERR_NETWORK",
    ERR_BAD_REQUEST = "ERR_BAD_REQUEST"
}

/**
* # External Link Type 📋
* @author stefanBid
* @enum {string} ExternalLinkType.
* @description This enum describe the type of an external url. Every type value is a string that represent the value of label url in ExternalLinkItem
*/

export enum ExternalLinkType {
CV_LINK_LABEL = "cv",
GITHUB_LINK_LABEL = "github",
LINKEDIN_LINK_LABEL = "linkedin",
INSTAGRAM_LINK_LABEL = "instagram",
GUESS_MY_NUMBER_REPO_LINK_LABEL = "guess-my-number-repo",
GUESS_MY_NUMBER_PLAY_LINK_LABEL = "guess-my-number-play",
PIG_GAME_REPO_LINK_LABEL = "pig-game-repo",
PIG_GAME_PLAY_LINK_LABEL = "pig-game-play",
IMAGE_CLASSIFICATION_REPO_LINK_LABEL = "image-classification-repo",
}