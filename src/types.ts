/*---- IRTERFACES ----*/

/**
 * This interface describes the structure of an item for header
 * @param path: path navigation route
 * @param name: alternative path for navigation route
 * @param label: Label to view 
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

/**
 * This interface describe the structure of an item on Skill page
 * @param icon: Box icon class
 * @param name: Name of skill
 * @param category: Category of skill
 * @param descrption: Description of skill
 * @param level: Skill confidence level
 */
export interface SkillItem{
    icon:string,
    name:string,
    category:string,
    description:string,
    level:number
}

/**
 * This interface describe the structure of an item on Portfolio page
 * @param name: Name of project
 * @param descrption: Description of project
 * @param codePath: path for view code
 * @param playPath: path for view project
 */
export interface ProjectItem{
    name:string,
    description:string,
    codePath:string
    playPath?:string
}


/*---- ENUMS ----*/
export enum ButtonType{
    CLASSIC = "classic",
    CLASSIC_MINIMAL = "classic-minimal",
    ROUNDED = "rounded",
    ROUNDED_MINIMAL = "rounded-minimal"
}

export enum RequestError{
    ERR_REQUEST = 404,
    ERR_NETWORK = 0
}