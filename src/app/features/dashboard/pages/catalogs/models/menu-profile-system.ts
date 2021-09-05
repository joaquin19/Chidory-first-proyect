export interface MenuProfileSystem {
    id: number;
    menuId: number;
    menuName: string;
    moduleId: number;
    parentMenuId: number;
    menuDisplayName: string;
    pageURL: string;
    iconName: string;
    sortOrder: number;
    profileSystemId: number;
    profileSystemName: string;
    create: boolean;
    update: boolean;
    delete: boolean;
    readOnly: boolean;
}
