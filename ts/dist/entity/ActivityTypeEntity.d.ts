import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { ActivityType, ActivityTypeLoadMatch } from '../OrbitTypes';
declare class ActivityTypeEntity extends OrbitEntityBase<ActivityType> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: ActivityTypeEntity): ActivityTypeEntity;
    load(this: any, reqmatch?: ActivityTypeLoadMatch, ctrl?: Control): Promise<ActivityTypeEntity>;
}
export { ActivityTypeEntity };
