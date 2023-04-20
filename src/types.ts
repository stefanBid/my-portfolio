//Header type

/**
 * This interface describes the structure of an item for header
 * @param path: path navigation route
 * @param name: alternative path for navigation route
 */
export interface HeaderType{
    path?:string,
    name?: string;
    label:string;
}