export interface AuthorizationProcess {
    id: number;
    authorizerId: number;
    fullName: string;
    processTypeId: number;
    processTypeName: string;
    authorizationStatusId: number;
    authorizationStatusName: string;
    detail: string;
    folio: string;
    observation: string;
    createBy: string;
    createdOn: string;
}
