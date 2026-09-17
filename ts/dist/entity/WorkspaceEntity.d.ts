import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Workspace, WorkspaceLoadMatch } from '../OrbitTypes';
declare class WorkspaceEntity extends OrbitEntityBase<Workspace> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: WorkspaceEntity): WorkspaceEntity;
    load(this: any, reqmatch?: WorkspaceLoadMatch, ctrl?: Control): Promise<WorkspaceEntity>;
}
export { WorkspaceEntity };
