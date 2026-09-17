import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Activity, ActivityLoadMatch, ActivityCreateData, ActivityUpdateData, ActivityRemoveMatch } from '../OrbitTypes';
declare class ActivityEntity extends OrbitEntityBase<Activity> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: ActivityEntity): ActivityEntity;
    load(this: any, reqmatch?: ActivityLoadMatch, ctrl?: Control): Promise<ActivityEntity>;
    create(this: any, reqdata?: ActivityCreateData, ctrl?: Control): Promise<ActivityEntity>;
    update(this: any, reqdata?: ActivityUpdateData, ctrl?: Control): Promise<ActivityEntity>;
    remove(this: any, reqmatch?: ActivityRemoveMatch, ctrl?: Control): Promise<ActivityEntity>;
}
export { ActivityEntity };
