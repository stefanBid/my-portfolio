//Header type

/**
 * This interface describes the structure of an item for header
 * @param path: path navigation route
 * @param name: alternative path for navigation route
 */
export interface HeaderType{
    path?:string,
    name?: string,
    label:string
}

/**
 * This interface describe the structure of an item on About me page
 * @param head: Title
 * @param content: Content
 */
export interface AboutMeItem{
    head:string,
    content:string
}

export interface SkillItem{
    icon:string,
    name:string,
    category:string,
    description:string,
    level:number
}

export interface ProjectItem{
    name:string,
    description:string,
    code_path:string
    play_path?:string
}