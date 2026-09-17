import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Organization, OrganizationLoadMatch, OrganizationUpdateData } from '../OrbitTypes';
declare class OrganizationEntity extends OrbitEntityBase<Organization> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    load(this: any, reqmatch?: OrganizationLoadMatch, ctrl?: Control): Promise<OrganizationEntity>;
    update(this: any, reqdata?: OrganizationUpdateData, ctrl?: Control): Promise<OrganizationEntity>;
}
export { OrganizationEntity };
